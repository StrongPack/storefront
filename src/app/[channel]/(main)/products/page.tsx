import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ProductListPaginatedDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { Pagination } from "@/ui/components/Pagination";
import { ProductList } from "@/ui/components/ProductList";
import { ProductsPerPage } from "@/app/config";
import { getChannelConfig } from "@/lib/channelConfig";

// import { first } from "lodash-es";
// import { channel } from "diagnostics_channel";

export const metadata = {
	title: "Products · Saleor Storefront example",
	description: "All products in Saleor Storefront example",
};

export default async function Page(props: {
	params: Promise<{ channel: string }>;
	searchParams: Promise<{
		cursor: string | string[] | undefined;
	}>;
}) {
	const searchParams = await props.searchParams;
	const params = await props.params;
	const { channel } = params;
	const { languageCode, locale } = await getChannelConfig(channel);

	const t = await getTranslations({ locale: locale, namespace: "common" });
	const cursor = typeof searchParams.cursor === "string" ? searchParams.cursor : null;

	const { products } = await executeGraphQL(ProductListPaginatedDocument, {
		variables: {
			first: ProductsPerPage,
			after: cursor,
			channel: channel,
			languageCode: languageCode,
		},
		revalidate: 60,
	});

	if (!products) {
		notFound();
	}

	const newSearchParams = new URLSearchParams({
		...(products.pageInfo.endCursor && { cursor: products.pageInfo.endCursor }),
	});

	return (
		<section className="mx-auto max-w-7xl p-8 pb-16">
			<h2 className="sr-only">{t("featured_products")}</h2>
			<ProductList products={products.edges.map((e) => e.node)} channel={channel} />
			<Pagination
				locale={locale}
				pageInfo={{
					...products.pageInfo,
					basePathname: `/products`,
					urlSearchParams: newSearchParams,
				}}
			/>
		</section>
	);
}
