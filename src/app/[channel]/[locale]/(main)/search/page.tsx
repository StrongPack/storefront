import { notFound, redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { OrderDirection, ProductOrderField, SearchProductsDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { Pagination } from "@/ui/components/Pagination";
import { ProductList } from "@/ui/components/ProductList";
import { ProductsPerPage } from "@/app/config";

export const metadata = {
	title: "Search products · 20pack",
	description: "Search products in 20pack",
};

export default async function Page(props: {
	searchParams: Promise<Record<"query" | "cursor", string | string[] | undefined>>;
	params: Promise<{ channel: string; locale: string }>;
}) {
	const [searchParams, params] = await Promise.all([props.searchParams, props.params]);
	const cursor = typeof searchParams.cursor === "string" ? searchParams.cursor : null;
	const searchValue = searchParams.query;
	const t = await getTranslations("common");

	if (!searchValue) {
		notFound();
	}

	if (Array.isArray(searchValue)) {
		const firstValidSearchValue = searchValue.find((v) => v.length > 0);
		if (!firstValidSearchValue) {
			notFound();
		}
		// redirect(`/${params.channel}/${params.locale}/search?${new URLSearchParams({ query: firstValidSearchValue }).toString()}`);
		redirect(`/${params.locale}/search?${new URLSearchParams({ query: firstValidSearchValue }).toString()}`);
	}

	const { products } = await executeGraphQL(SearchProductsDocument, {
		variables: {
			first: ProductsPerPage,
			search: searchValue,
			after: cursor,
			sortBy: ProductOrderField.Rating,
			sortDirection: OrderDirection.Asc,
			channel: params.channel,
		},
		revalidate: 60,
	});

	if (!products) {
		notFound();
	}

	const newSearchParams = new URLSearchParams({
		query: searchValue,
		...(products.pageInfo.endCursor && { cursor: products.pageInfo.endCursor }),
	});

	return (
		<section className="mx-auto max-w-7xl p-8 pb-16">
			{products.totalCount && products.totalCount > 0 ? (
				<div>
					<h1 className="pb-8 text-xl font-semibold">
						{t("search_results_for")} &quot;{searchValue}&quot;:
					</h1>
					<ProductList products={products.edges.map((e) => e.node)} />
					<Pagination
						pageInfo={{
							...products.pageInfo,
							basePathname: `/${params.locale}/search`,
							// basePathname: `/${channel}/${params.locale}/search`,
							urlSearchParams: newSearchParams,
						}}
					/>
				</div>
			) : (
				<h1 className="mx-auto pb-8 text-center text-xl font-semibold">{t("nothing_found")}</h1>
			)}
		</section>
	);
}
