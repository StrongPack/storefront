import { notFound } from "next/navigation";

import { type Metadata } from "next";
import edjsHTML from "editorjs-html";
import he from "he";
// import xss from "xss";
import { PageGetBySlugDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { getChannelConfig } from "@/lib/channelConfig";
import type { EditorJSData } from "@/lib/editorjs"; // مسیر بسته به ساختار پروژه
// import { marked } from "marked";

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

	let finalHtml: string[] | string = "";
	const rawContent = isNotEn && translation?.content ? translation.content : content;

	if (!rawContent) {
		finalHtml = "";
	} else {
		try {
			const parsed = JSON.parse(rawContent);
			const contentJson = parsed as EditorJSData;
			if (parsed && Array.isArray(contentJson.blocks)) {
				const hasHtmlEntities = contentJson.blocks.some((b) =>
					/&lt;|&gt;|&amp;[a-z]+;/.test(b?.data?.text || ""),
				);

				if (hasHtmlEntities) {
					finalHtml = he.decode(contentJson.blocks.map((b) => b.data.text || "").join(" "));
				} else {
					const parsedResult = parser.parse(parsed);
					finalHtml = Array.isArray(parsedResult) ? parsedResult.join("") : parsedResult;
				}
			} else {
				finalHtml = rawContent;
			}
		} catch {
			finalHtml = rawContent;
		}
	}

	// let contentJson: EditorJSData | null = null;

	// if (content) {
	// 	const raw = isNotEn && translation?.content ? translation.content : content;
	// 	contentJson = JSON.parse(raw) as EditorJSData;
	// }

	// const finalHtml = contentJson ? he.decode(contentJson.blocks.map((b: any) => b.data.text).join(" ")) : "";

	// if (content)
	// 	contentHtml =
	// 		isNotEn && translation?.content
	// 			? parser.parse(JSON.parse(translation.content))
	// 			: parser.parse(JSON.parse(content));

	const contentTitle = isNotEn && translation?.title ? translation.title : title;

	// const contentHtml = content ? parser.parse(JSON.parse(content)) : null;

	return (
		<div className="mx-auto max-w-7xl p-8 pb-16">
			<h1 className="text-3xl font-semibold">{contentTitle}</h1>
			{/* {contentHtml && (
				<div className="prose">
					{contentHtml.map((content) => (
						<div key={content} dangerouslySetInnerHTML={{ __html: xss(content) }} />
					))}
				</div>
			)} */}

			{/* <article className="prose" dangerouslySetInnerHTML={{ __html: finalHtml }} /> */}
			{/* <article
				className="prose text-justify leading-relaxed"
				dangerouslySetInnerHTML={{ __html: finalHtml }}
			/> */}

			<article
				dir={isNotEn ? "rtl" : "ltr"}
				// className="prose text-justify leading-relaxed "
				className="prose prose-lg max-w-none text-justify leading-relaxed"
				dangerouslySetInnerHTML={{ __html: finalHtml }}
			/>
		</div>
	);
}
