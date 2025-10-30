import { notFound } from "next/navigation";
import { type ResolvingMetadata, type Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ProductListByCategoryDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { ProductList } from "@/ui/components/ProductList";
import { getChannelConfig } from "@/lib/channelConfig";

export const generateMetadata = async (
	props: { params: Promise<{ slug: string; channel: string }> },
	parent: ResolvingMetadata,
): Promise<Metadata> => {
	const params = await props.params;
	const { channel, slug } = params;
	const { languageCode } = await getChannelConfig(channel);

	const { category } = await executeGraphQL(ProductListByCategoryDocument, {
		variables: { slug: slug, channel: channel, languageCode: languageCode },
		revalidate: 60,
	});

	return {
		title: `${category?.name || "Categroy"} | ${category?.seoTitle || (await parent).title?.absolute}`,
		description: category?.seoDescription || category?.description || category?.seoTitle || category?.name,
	};
};

export default async function Page(props: { params: Promise<{ slug: string; channel: string }> }) {
	const params = await props.params;
	const { channel, slug } = params;

	const { languageCode, locale } = await getChannelConfig(channel);
	const t = await getTranslations({ locale: locale, namespace: "common" });

	const { category } = await executeGraphQL(ProductListByCategoryDocument, {
		variables: { slug, channel, languageCode },
		revalidate: 60,
	});

	if (!category || !category.products) {
		notFound();
	}

	const { products } = category;
	const isNotEn = locale !== "en";

	const translation = category.translation;
	const displayName = isNotEn && translation?.name ? translation.name : category.name;

	return (
		<div className="mx-auto max-w-7xl p-8 pb-16">
			{products.edges.length > 0 ? (
				<>
					<h1 className="pb-8 text-xl font-semibold">{displayName}</h1>
					<ProductList products={products.edges.map((e) => e.node)} channel={channel} />
				</>
			) : (
				<h1 className="mx-auto pb-8 text-center text-xl font-semibold">{t("nothing_found")}</h1>
			)}
		</div>
	);
}
