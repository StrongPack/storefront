import Image from "next/image"; // جایگزین برای <img>
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { type ResolvingMetadata, type Metadata } from "next";
import xss from "xss";
import { invariant } from "ts-invariant";
import { type WithContext, type Product } from "schema-dts";
// import { AddButton } from "./AddButton";
import ProductImageSlider from "./ProductImageSlider";
import { VariantSelector } from "@/ui/components/VariantSelector";
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
import { getProductDisplayData } from "@/lib/productDisplayData";

export async function generateMetadata(
	props: {
		params: Promise<{ slug: string; channel: string }>;
		searchParams: Promise<{ variant?: string }>;
	},
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const [searchParams, params] = await Promise.all([props.searchParams, props.params]);

	const { channel } = params;
	const { languageCode, locale } = await getChannelConfig(channel);
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

	const isNotEn = locale !== "en";
	const productTyped = product as ProductListItemFragment;

	const displayData = getProductDisplayData(productTyped, isNotEn);
	const { name, seoTitle, seoDescription, categoryName, keyWords } = displayData;

	const variants = product.variants;
	const selectedVariantID = searchParams.variant;
	const selectedVariant = variants?.find(({ id }) => id === selectedVariantID);
	const selectedVariantName = (isNotEn && selectedVariant?.translation?.name) || selectedVariant?.name;
	const nameWithVariant = selectedVariantName ? `${name} - ${selectedVariantName}` : name;

	return {
		title: `${name} | ${seoTitle}`,
		description: seoDescription || nameWithVariant,
		alternates: {
			canonical: process.env.NEXT_PUBLIC_STOREFRONT_URL
				? process.env.NEXT_PUBLIC_STOREFRONT_URL + `/products/${encodeURIComponent(params.slug)}`
				: undefined,
		},
		// openGraph: product.thumbnail
		// 	? {
		// 			images: [
		// 				{
		// 					url: product.thumbnail.url,
		// 					alt: name,
		// 				},
		// 			],
		// 		}
		// 	: null,
		openGraph: product.thumbnail
			? {
					title: `${name} | ${seoTitle}`,
					description: seoDescription || nameWithVariant,
					type: "website",
					images: [{ url: product.thumbnail?.url, alt: name }],
				}
			: null,
		// keywords: [productCategoryName, productName, productKeyWords].join(", "),
		keywords: [categoryName, name, keyWords].filter(Boolean).join(", "),
		robots: { index: true, follow: true },
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

export default async function Page(props: {
	params: Promise<{ slug: string; channel: string }>;
	searchParams: Promise<{ variant?: string }>;
}) {
	const [searchParams, params] = await Promise.all([props.searchParams, props.params]);

	const { channel } = params;
	const { languageCode, locale } = await getChannelConfig(channel);
	const t = await getTranslations({ locale: locale, namespace: "common" });
	const t2 = await getTranslations({ locale: locale, namespace: "orders" });
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

	// const firstImage = product.thumbnail;
	// const hasImages = Array.isArray(product.media) && product.media.length > 0;

	const isNotEn = locale !== "en";
	const productTyped = product as ProductListItemFragment;

	const displayData = getProductDisplayData(productTyped, isNotEn);
	const {
		name: displayName,
		seoDescription: displaySeoDescription,
		categoryName: displayCategoryName,
		descriptionHtml: description,
	} = displayData;

	const variants = product.variants;
	const selectedVariantID = searchParams.variant;
	const selectedVariant = variants?.find(({ id }) => id === selectedVariantID);
	const selectedVariantName = (isNotEn && selectedVariant?.translation?.name) || selectedVariant?.name;

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
		category: displayCategoryName,
		brand: {
			"@type": "Brand",
			name: "20Pack",
		},
		sku: product.variants?.[0]?.id,
		...(selectedVariant
			? {
					name: `${displayName} - ${selectedVariantName}`,
					description: displaySeoDescription || description || `${displayName} - ${selectedVariantName}`,
					offers: {
						"@type": "Offer",
						availability: selectedVariant.quantityAvailable
							? "https://schema.org/InStock"
							: "https://schema.org/OutOfStock",
						priceCurrency: selectedVariant.pricing?.price?.gross.currency,
						price: selectedVariant.pricing?.price?.gross.amount,
						url: process.env.NEXT_PUBLIC_STOREFRONT_URL + `/products/${encodeURIComponent(params.slug)}`,
					},
				}
			: {
					name: displayName,
					description: displaySeoDescription || description || displayName,
					offers: {
						"@type": "AggregateOffer",
						availability: product.variants?.some((variant) => variant.quantityAvailable)
							? "https://schema.org/InStock"
							: "https://schema.org/OutOfStock",
						priceCurrency: product.pricing?.priceRange?.start?.gross.currency,
						lowPrice: product.pricing?.priceRange?.start?.gross.amount,
						highPrice: product.pricing?.priceRange?.stop?.gross.amount,
						url: process.env.NEXT_PUBLIC_STOREFRONT_URL + `/products/${encodeURIComponent(params.slug)}`,
					},
				}),
		// aggregateRating: {
		// 	"@type": "AggregateRating",
		// 	ratingValue: product.rating || 5,
		// 	reviewCount: 1,
		// },
		// review: [
		// 	{
		// 		"@type": "Review",
		// 		author: { "@type": "Person", name: "Admin" },
		// 		datePublished: "2025-01-14",
		// 		reviewBody: "Excellent industrial packaging quality, premium nylon sheets.",
		// 		name: displayName,
		// 		reviewRating: {
		// 			"@type": "Rating",
		// 			ratingValue: product.rating || 5,
		// 			bestRating: 5,
		// 			worstRating: 1,
		// 		},
		// 	},
		// ],
	};

	// const productJsonLd = {
	// 	offers: {
	// 		"@type": "Offer",
	// 		priceCurrency: product.variants?.[0]?.pricing?.price?.gross?.currency,
	// 		price: product.variants?.[0]?.pricing?.price?.gross?.amount,
	// 		availability:
	// 			product.variants?.[0]?.quantityAvailable > 0
	// 				? "https://schema.org/InStock"
	// 				: "https://schema.org/OutOfStock",
	// 		url: `${process.env.NEXT_PUBLIC_STOREFRONT_URL}/products/${product.slug}`,
	// 	},
	// 	aggregateRating: {
	// 		"@type": "AggregateRating",
	// 		ratingValue: product.rating || 5,
	// 		reviewCount: 1,
	// 	},
	// };

	// shippingDetails
	// hasMerchantReturnPolicy

	// aggregateRating
	// review
	// priceValidUntil

	return (
		<section className="mx-auto grid max-w-7xl p-4 sm:p-6 md:p-8 lg:p-8">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(productJsonLd),
				}}
			/>
			<form className="grid grid-cols-1 gap-4 md:grid-cols-8 lg:grid-cols-8" action={addItem}>
				<div className="order-1 sm:order-1 md:order-1 md:col-span-4 lg:order-1 lg:col-span-5">
					<ProductImageSlider
						images={product.media ?? []}
						fallback={product.thumbnail ?? undefined}
						displayName={displayName}
					/>
				</div>
				<div className="order-2 flex flex-col pt-6 sm:order-2 sm:px-6 sm:pt-0 md:order-2 md:col-span-4 lg:order-2 lg:col-span-3 lg:pt-16">
					<div>
						<h1 className="mb-4 text-center text-2xl font-medium tracking-tight text-neutral-900 sm:text-justify sm:text-3xl">
							{displayName}
						</h1>

						<div className="mb-6 flex items-center justify-between pb-3 text-base font-medium text-neutral-900 sm:text-lg">
							<span className="text-neutral-600">{t2("price")}</span>
							<span className="font-price text-lg font-semibold text-amber-700 transition-colors duration-200 hover:text-amber-800 sm:text-xl">
								{price}
							</span>
						</div>

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
						<a
							href="tel:+989011443374"
							className="mt-6 flex items-center justify-center gap-2 rounded-md border border-amber-300 bg-amber-50 px-4 py-2.5 text-base font-semibold text-amber-800 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-100 hover:shadow-md sm:mt-8 sm:gap-3 sm:px-6 sm:py-3 sm:text-lg"
						>
							<Image
								src="/icons/phone-solid-full.svg"
								alt="Contact phone"
								width={20}
								height={20}
								className="animate-wiggle"
							/>
							<span>{t("contact_for_price")}</span>
						</a>

						{(() => {
							const filledAttributes = product.attributes?.filter(
								({ values }) => Array.isArray(values) && values.length > 0,
							);

							if (!filledAttributes?.length) return null;

							return (
								<div className="mt-8 space-y-2 text-sm text-neutral-700">
									<h3 className="mb-2 font-semibold text-neutral-800">{t("product_attributes_title")}</h3>
									<ul className="list-inside list-disc space-y-1">
										{filledAttributes.map(({ attribute, values }) => {
											const attrName = attribute.translation?.name || attribute.name;

											// فقط نام‌هایی که واقعاً وجود دارند
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
							);
						})()}

						{/* {product.attributes?.length ? (
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
						) : null} */}

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
