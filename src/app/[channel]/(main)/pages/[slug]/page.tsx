import { notFound } from "next/navigation";

import { type Metadata } from "next";
import edjsHTML from "editorjs-html";
import xss from "xss";
import { PageGetBySlugDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { getChannelConfig } from "@/lib/channelConfig";

const parser = edjsHTML();

export const generateMetadata = async (props: {
	params: Promise<{ slug: string; channel: string }>;
}): Promise<Metadata> => {
	const params = await props.params;
	const { channel } = params;
	const { languageCode } = await getChannelConfig(channel);

	const { page } = await executeGraphQL(PageGetBySlugDocument, {
		variables: { slug: params.slug, languageCode: languageCode },
		revalidate: 60,
	});

	return {
		title: `${page?.seoTitle || page?.title || "Page"} · Saleor Storefront example`,
		description: page?.seoDescription || page?.seoTitle || page?.title,
	};
};

export default async function Page(props: { params: Promise<{ slug: string; channel: string }> }) {
	const params = await props.params;
	const { channel } = params;
	const { locale, languageCode } = await getChannelConfig(channel);

	const { page } = await executeGraphQL(PageGetBySlugDocument, {
		variables: { slug: params.slug, languageCode: languageCode },
		revalidate: 60,
	});

	if (!page) {
		notFound();
	}

	const { title, content } = page;

	const isNotEn = locale !== "en";

	const translation = page.translation;
	let contentHtml = null;
	if (content)
		contentHtml =
			isNotEn && translation?.content
				? parser.parse(JSON.parse(translation.content))
				: parser.parse(JSON.parse(content));

	const contentTitle = isNotEn && translation?.title ? translation.title : title;

	// const contentHtml = content ? parser.parse(JSON.parse(content)) : null;

	return (
		<div className="mx-auto max-w-7xl p-8 pb-16">
			<h1 className="text-3xl font-semibold">{contentTitle}</h1>
			{contentHtml && (
				<div className="prose">
					{contentHtml.map((content) => (
						<div key={content} dangerouslySetInnerHTML={{ __html: xss(content) }} />
					))}
				</div>
			)}
		</div>
	);
}
