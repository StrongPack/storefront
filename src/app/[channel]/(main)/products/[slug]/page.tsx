import edjsHTML from "editorjs-html";
import Image from "next/image"; // جایگزین برای <img>
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { type ResolvingMetadata, type Metadata } from "next";
import xss from "xss";
import { invariant } from "ts-invariant";
import { type WithContext, type Product } from "schema-dts";
// import { AddButton } from "./AddButton";
import { VariantSelector } from "@/ui/components/VariantSelector";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";
import { executeGraphQL } from "@/lib/graphql";
import { getChannelConfig } from "@/lib/channelConfig";
import { formatMoney, formatMoneyRange } from "@/lib/utils";
import {
	CheckoutAddLineDocument,
	ProductDetailsDocument,
	ProductListDocument,
	type ProductListItemFragment,
} from "@/gql/graphql";
import * as Checkout from "@/lib/checkout";
import { AvailabilityMessage } from "@/ui/components/AvailabilityMessage";

export async function generateMetadata(
	props: {
		params: Promise<{ slug: string; channel: string }>;
		searchParams: Promise<{ variant?: string }>;
	},
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const [searchParams, params] = await Promise.all([props.searchParams, props.params]);

	const { channel } = params;
	const { languageCode } = await getChannelConfig(channel);

	const { product } = await executeGraphQL(ProductDetailsDocument, {
		variables: {
			slug: decodeURIComponent(params.slug),
			channel: params.channel,
			languageCode: languageCode,
		},
		revalidate: 60,
	});

	if (!product) {
		notFound();
	}

	const productName = product.seoTitle || product.name;
	const variantName = product.variants?.find(({ id }) => id === searchParams.variant)?.name;
	const productNameAndVariant = variantName ? `${productName} - ${variantName}` : productName;

	return {
		title: `${product.name} | ${product.seoTitle || (await parent).title?.absolute}`,
		description: product.seoDescription || productNameAndVariant,
		alternates: {
			canonical: process.env.NEXT_PUBLIC_STOREFRONT_URL
				? process.env.NEXT_PUBLIC_STOREFRONT_URL + `/products/${encodeURIComponent(params.slug)}`
				: undefined,
		},
		openGraph: product.thumbnail
			? {
					images: [
						{
							url: product.thumbnail.url,
							alt: product.name,
						},
					],
				}
			: null,
	};
}

export async function generateStaticParams({ params }: { params: { channel: string } }) {
	const { channel } = params;
	const { languageCode } = await getChannelConfig(channel);

	const { products } = await executeGraphQL(ProductListDocument, {
		revalidate: 60,
		variables: { first: 20, channel: params.channel, languageCode: languageCode },
		withAuth: false,
	});

	const paths = products?.edges.map(({ node: { slug } }) => ({ slug })) || [];
	return paths;
}

const parser = edjsHTML();

export default async function Page(props: {
	params: Promise<{ slug: string; channel: string }>;
	searchParams: Promise<{ variant?: string }>;
}) {
	const [searchParams, params] = await Promise.all([props.searchParams, props.params]);

	const { channel } = params;
	const { languageCode, locale } = await getChannelConfig(channel);
	const t = await getTranslations({ locale: locale, namespace: "common" });
	const { product } = await executeGraphQL(ProductDetailsDocument, {
		variables: {
			slug: decodeURIComponent(params.slug),
			channel: params.channel,
			languageCode: languageCode,
		},
		revalidate: 60,
	});

	if (!product) {
		notFound();
	}

	const firstImage = product.thumbnail;

	const isNotEn = locale !== "en";

	const productTyped = product as ProductListItemFragment;
	const productTranslation = productTyped.translation;

	const displayName = (isNotEn && productTranslation?.name) || productTyped.name || product.name;
	const displaySeoDescription =
		(isNotEn && productTranslation?.seoDescription) || productTyped.seoDescription || product.seoDescription;

	const descriptionJson =
		(isNotEn && productTranslation?.description) || productTyped.description || product.description;
	const description = descriptionJson ? parser.parse(JSON.parse(descriptionJson)) : null;

	const variants = product.variants;
	const selectedVariantID = searchParams.variant;
	const selectedVariant = variants?.find(({ id }) => id === selectedVariantID);

	async function addItem() {
		"use server";

		const checkout = await Checkout.findOrCreate({
			checkoutId: await Checkout.getIdFromCookies(params.channel),
			channel: params.channel,
			languageCode: languageCode,
		});
		invariant(checkout, "This should never happen");

		await Checkout.saveIdToCookie(params.channel, checkout.id);

		if (!selectedVariantID) {
			return;
		}

		// TODO: error handling
		await executeGraphQL(CheckoutAddLineDocument, {
			variables: {
				id: checkout.id,
				productVariantId: decodeURIComponent(selectedVariantID),
			},
			cache: "no-cache",
		});

		revalidatePath("/cart");
	}

	const isAvailable = variants?.some((variant) => variant.quantityAvailable) ?? false;

	// console.log(selectedVariant?.pricing?.price?.gross);
	const price = selectedVariant?.pricing?.price?.gross
		? formatMoney(
				selectedVariant.pricing.price.gross.amount,
				selectedVariant.pricing.price.gross.currency,
				locale,
			)
		: isAvailable
			? formatMoneyRange(
					{
						start: product?.pricing?.priceRange?.start?.gross,
						stop: product?.pricing?.priceRange?.stop?.gross,
					},
					locale,
				)
			: "";

	const productJsonLd: WithContext<Product> = {
		"@context": "https://schema.org",
		"@type": "Product",
		image: product.thumbnail?.url,
		...(selectedVariant
			? {
					name: `${displayName} - ${selectedVariant.name}`,
					description: displaySeoDescription || `${displayName} - ${selectedVariant.name}`,
					offers: {
						"@type": "Offer",
						availability: selectedVariant.quantityAvailable
							? "https://schema.org/InStock"
							: "https://schema.org/OutOfStock",
						priceCurrency: selectedVariant.pricing?.price?.gross.currency,
						price: selectedVariant.pricing?.price?.gross.amount,
					},
				}
			: {
					name: displayName,
					description: displaySeoDescription || displayName,
					offers: {
						"@type": "AggregateOffer",
						availability: product.variants?.some((variant) => variant.quantityAvailable)
							? "https://schema.org/InStock"
							: "https://schema.org/OutOfStock",
						priceCurrency: product.pricing?.priceRange?.start?.gross.currency,
						lowPrice: product.pricing?.priceRange?.start?.gross.amount,
						highPrice: product.pricing?.priceRange?.stop?.gross.amount,
					},
				}),
	};

	return (
		<section className="mx-auto grid max-w-7xl p-8">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(productJsonLd),
				}}
			/>
			<form className="grid gap-2 sm:grid-cols-2 lg:grid-cols-8" action={addItem}>
				<div className="md:col-span-1 lg:col-span-5">
					{firstImage && (
						<ProductImageWrapper
							priority={true}
							alt={firstImage.alt ?? ""}
							width={1024}
							height={1024}
							src={firstImage.url}
						/>
					)}
				</div>
				<div className="flex flex-col pt-6 sm:col-span-1 sm:px-6 sm:pt-0 lg:col-span-3 lg:pt-16">
					<div>
						{/* <h1 className="mb-4 flex-auto text-3xl font-medium tracking-tight text-neutral-900">
							{displayName}
						</h1> */}
						<h1 className="mb-4 flex-auto text-justify text-3xl font-medium tracking-tight text-neutral-900">
							{displayName}
						</h1>
						<p className="mb-8 text-sm " data-testid="ProductElement_Price">
							{price}
						</p>

						{variants && (
							<VariantSelector
								selectedVariant={selectedVariant}
								variants={variants}
								product={product}
								channel={channel}
								locale={locale}
							/>
						)}
						<AvailabilityMessage isAvailable={isAvailable} />
						{/* <div className="mt-8">
							<AddButton disabled={!selectedVariantID || !selectedVariant?.quantityAvailable} />
						</div> */}

						{/* <div className="mt-8 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-center text-base font-semibold text-amber-800 shadow-sm transition hover:border-amber-400 hover:bg-amber-100 hover:shadow-md">
							{t("contact_for_price")}
						</div> */}

						<a
							href="tel:+989011443374"
							className="mt-8 flex items-center justify-center gap-3 rounded-lg border border-amber-300 bg-amber-50 px-6 py-3 text-lg font-semibold text-amber-800 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-100 hover:shadow-md"
						>
							<Image
								src="/icons/phone-solid-full.svg"
								alt="Contact phone"
								width={22}
								height={22}
								className="animate-wiggle group-hover:animate-wiggle transition-transform duration-300"
							/>
							<span className="block text-justify">{t("contact_for_price")}</span>
						</a>

						{product.attributes?.length ? (
							<div className="mt-8 space-y-2 text-sm text-neutral-700">
								<h3 className="mb-2 font-semibold text-neutral-800">{t("product_attributes_title")}</h3>
								<ul className="list-inside list-disc space-y-1">
									{product.attributes.map(({ attribute, values }) => {
										const attrName = attribute.translation?.name || attribute.name;

										const valueNames = values
											.map((v) => v.translation?.name || v.name)
											.filter(Boolean)
											.join(", ");

										return (
											<li key={attribute.name}>
												<span className="font-medium">{attrName}: </span>
												<span>{valueNames}</span>
											</li>
										);
									})}
								</ul>
							</div>
						) : null}

						{description && (
							<div className="mt-8 space-y-6 text-sm text-neutral-500">
								{description.map((content) => (
									<div
										key={content}
										className="text-justify"
										dangerouslySetInnerHTML={{ __html: xss(content) }}
									/>
								))}
							</div>
						)}
					</div>
				</div>
			</form>
		</section>
	);
}
