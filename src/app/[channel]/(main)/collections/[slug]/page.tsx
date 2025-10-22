import { notFound } from "next/navigation";
import { type ResolvingMetadata, type Metadata } from "next";
import { ProductListByCollectionDocument } from "@/gql/graphql";
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

	const { collection } = await executeGraphQL(ProductListByCollectionDocument, {
		variables: { slug: slug, channel: channel, languageCode: languageCode },
		revalidate: 60,
	});

	return {
		title: `${collection?.name || "Collection"} | ${collection?.seoTitle || (await parent).title?.absolute}`,
		description:
			collection?.seoDescription || collection?.description || collection?.seoTitle || collection?.name,
	};
};

export default async function Page(props: { params: Promise<{ slug: string; channel: string }> }) {
	const params = await props.params;
	const { channel, slug } = params;

	const { languageCode, locale } = await getChannelConfig(channel);

	const { collection } = await executeGraphQL(ProductListByCollectionDocument, {
		variables: { slug, channel, languageCode },
		revalidate: 60,
	});

	if (!collection || !collection.products) {
		notFound();
	}

	const { products } = collection;
	const isFa = locale === "fa";

	const translation = collection.translation;
	const displayName = isFa && translation?.name ? translation.name : collection.name;

	return (
		<div className="mx-auto max-w-7xl p-8 pb-16">
			<h1 className="pb-8 text-xl font-semibold">{displayName}</h1>
			<ProductList products={products.edges.map((e) => e.node)} channel={channel} />
		</div>
	);
}
