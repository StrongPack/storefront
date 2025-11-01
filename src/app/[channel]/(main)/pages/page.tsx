import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { MenuGetBySlugDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { getChannelConfig } from "@/lib/channelConfig";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

export const metadata = {
	title: "Blogs · Saleor Storefront example",
	description: "All Blogs in Saleor Storefront example",
};

export default async function Page(props: { params: Promise<{ channel: string }> }) {
	const params = await props.params;
	const { channel } = params;
	const { languageCode, locale, dir } = await getChannelConfig(channel);

	const isRTL = dir === "rtl";
	const isNotEn = locale !== "en";
	const t = await getTranslations({ locale: locale, namespace: "common" });

	const PageLinks = await executeGraphQL(MenuGetBySlugDocument, {
		variables: { slug: "blog", channel, languageCode: languageCode },
		revalidate: 60 * 60 * 24,
	});

	if (!PageLinks || !PageLinks.menu?.items) {
		notFound();
	}

	const items = PageLinks.menu.items;

	// console.log(PageLinks);

	return (
		<section className="mx-auto max-w-7xl px-6 py-16 md:px-8">
			<h1 className={`mb-12 text-3xl font-bold ${isRTL ? "text-right" : "text-left"} text-gray-800`}>
				{t("blog_articles")}
			</h1>

			<div className={`grid gap-10 sm:grid-cols-2 lg:grid-cols-3 ${isRTL ? "text-right" : "text-left"}`}>
				{items.map((item) => {
					// const translationTitle = isNotEn && item.translation?.name ? item.translation.name : item.name;

					const page = item.page;
					if (!page) return null;

					const displayTitle = isNotEn && page.translation?.title ? page.translation.title : page.title;

					// گرفتن meta image از metadata صفحه
					const imageMeta = page.metadata?.find((meta) => meta.key === "image");
					const imageUrl = imageMeta ? imageMeta.value : "/images/blog-placeholder.png";

					// تاریخ ساخت مقاله
					const createdDate = page.created ? new Date(page.created).toLocaleDateString(locale) : "";

					// گرفتن خلاصه از metadata یا ساخت دستی برای طراحی زیبا
					const summaryMeta = page.metadata?.find((meta) => meta.key === "summary");
					const summary = summaryMeta?.value ?? t("read_the_full_article");

					return (
						<LinkWithChannel
							key={item.id}
							href={`/pages/${page.slug}`}
							className="group block overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg"
						>
							{/* تصویر مقاله */}
							<div className="relative h-56 w-full">
								<Image
									src={imageUrl}
									alt={displayTitle}
									fill
									sizes="(max-width: 768px) 100vw, 33vw"
									className="object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							</div>

							{/* متن مقاله */}
							<div className="p-5">
								{/* <h2 className="truncate text-lg font-semibold text-gray-900">{displayTitle}</h2> */}
								<h2 className="whitespace-normal break-words text-lg font-semibold text-gray-900">
									{displayTitle}
								</h2>

								<p className="mt-1 text-sm text-gray-500">{createdDate}</p>

								{/* <p className="mt-3 line-clamp-3 text-sm text-gray-700">{summary}</p> */}
								<p className="mt-3 line-clamp-3 text-sm text-gray-700">{summary}</p>

								<p
									className={`text-primary-600 group-hover:text-primary-800 mt-4 flex items-center gap-1 text-sm font-semibold ${
										isRTL ? "flex-row-reverse justify-start" : "justify-end"
									}`}
								>
									{isRTL ? t("read_more") + " ←" : t("read_more") + " →"}
								</p>
							</div>
						</LinkWithChannel>
					);
				})}
			</div>
		</section>
	);
}
