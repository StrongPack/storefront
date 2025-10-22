import { getTranslations } from "next-intl/server";
import { ProductListByCollectionDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { ProductList } from "@/ui/components/ProductList";
import { getChannelConfig } from "@/lib/channelConfig";

export const metadata = {
	title: "20pack",
	description: "Storefront.",
};

export default async function Page({ params }: { params: Promise<{ channel: string }> }) {
	const { channel } = await params;
	const { locale, languageCode } = await getChannelConfig(channel);

	const t = await getTranslations({ locale: locale, namespace: "common" });
	const data = await executeGraphQL(ProductListByCollectionDocument, {
		variables: {
			slug: "featured-products",
			channel: channel,
			languageCode: languageCode,
		},
		revalidate: 60,
	});

	if (!data.collection?.products) {
		return null;
	}

	const products = data.collection?.products.edges.map(({ node: product }) => product);

	return (
		<section className="mx-auto max-w-7xl p-8 pb-16">
			<h2 className="sr-only">{t("featured_products")}</h2>
			<ProductList products={products} />
		</section>
	);
}
