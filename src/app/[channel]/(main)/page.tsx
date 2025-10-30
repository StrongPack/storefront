import { getTranslations } from "next-intl/server";
import { ProductListByCollectionDocument, MenuGetBySlugDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { ProductList } from "@/ui/components/ProductList";
import { getChannelConfig } from "@/lib/channelConfig";
// import { CollectionCategorySlider } from "@/ui/components/nav/components/CollectionCategorySlider";
// import { CollectionCategorySliderStaticGrouped } from "@/ui/components/nav/components/CollectionCategorySliderStaticGrouped";
import { CollectionCategorySliderSplit } from "@/ui/components/nav/components/CollectionCategorySliderSplit";

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

	const { menu } = await executeGraphQL(MenuGetBySlugDocument, {
		variables: { slug: "navbar", channel, languageCode },
		revalidate: 60 * 60 * 12,
	});

	const isRTL = ["fa", "ar"].includes(locale);
	const isNotEn = locale !== "en";
	// console.log(menu);
	// const sliderItems =
	// 	menu?.items
	// 		?.map((item) => {
	// 			if (item.category) {
	// 				const name =
	// 					isNotEn && item.category.translation?.name ? item.category.translation.name : item.category.name;
	// 				const image = item.category.backgroundImage?.url || "/images/placeholder-category.png";
	// 				return { id: item.id, href: `/categories/${item.category.slug}`, label: name, image };
	// 			}
	// 			return null;
	// 		})
	// 		.filter(Boolean) ?? [];

	// const sliderItems =
	// 	menu?.items?.flatMap((item) => {
	// 		// اگر دسته اصلی وجود داشت
	// 		if (item.category) {
	// 			const mainName =
	// 				isNotEn && item.category.translation?.name ? item.category.translation.name : item.category.name;
	// 			const mainImage = item.category.backgroundImage?.url || "/images/placeholder-category.png";

	// 			// شی‌ء مربوط به دسته اصلی
	// 			const mainCategoryObj = {
	// 				id: item.id,
	// 				href: `/categories/${item.category.slug}`,
	// 				label: mainName,
	// 				image: mainImage,
	// 			};

	// 			// زیر‌دسته‌ها
	// 			const subCategories =
	// 				item.category.children?.edges?.map(({ node }) => {
	// 					const subName = isNotEn && node.translation?.name ? node.translation.name : node.name;
	// 					return {
	// 						id: node.id,
	// 						href: `/categories/${node.slug}`,
	// 						label: subName,
	// 						image: "/images/placeholder-category.png",
	// 					};
	// 				}) ?? [];

	// 			return [mainCategoryObj, ...subCategories];
	// 		}
	// 		return [];
	// 	}) ?? [];

	// ✅ نسخه ویژه برای CollectionCategorySliderStaticGrouped
	// const groupedItems =
	// 	menu?.items
	// 		?.filter((item) => item.category)
	// 		.map((item) => {
	// 			const main = item.category!;
	// 			const name = isNotEn && main.translation?.name ? main.translation.name : main.name;
	// 			const image = main.backgroundImage?.url || "/images/placeholder-category.png";

	// 			const children =
	// 				main.children?.edges?.map(({ node }) => {
	// 					const subName = isNotEn && node.translation?.name ? node.translation.name : node.name;
	// 					return {
	// 						id: node.id,
	// 						label: subName,
	// 						href: `/categories/${node.slug}`,
	// 						image: node.backgroundImage?.url || "/images/placeholder-category.png",
	// 					};
	// 				}) ?? [];

	// 			return {
	// 				id: item.id,
	// 				label: name,
	// 				href: `/categories/${main.slug}`,
	// 				image,
	// 				children,
	// 			};
	// 		}) ?? [];

	// ✅ ساخت داده‌ی نهایی اسلایدر
	// const allItems =
	// 	menu?.items
	// 		?.flatMap((item) => {
	// 			if (!item.category) return [];
	// 			const main = item.category;
	// 			const mainName = isNotEn && main.translation?.name ? main.translation.name : main.name;
	// 			const mainImage = main.backgroundImage?.url || "/images/placeholder-category.png";

	// 			const mainObj = {
	// 				id: item.id,
	// 				href: `/categories/${main.slug}`,
	// 				label: mainName,
	// 				image: mainImage,
	// 			};

	// 			// افزودن زیردسته‌ها
	// 			const children =
	// 				main.children?.edges?.map(({ node }) => {
	// 					const subName = isNotEn && node.translation?.name ? node.translation.name : node.name;
	// 					return {
	// 						id: node.id,
	// 						href: `/categories/${node.slug}`,
	// 						label: subName,
	// 						image: node.backgroundImage?.url || "/images/placeholder-category.png",
	// 					};
	// 				}) ?? [];

	// 			return [mainObj, ...children];
	// 		})
	// 		.filter(Boolean) ?? [];

	const mainItems =
		menu?.items?.flatMap((item) => {
			if (!item.category) return [];
			const main = item.category;
			const mainName = isNotEn && main.translation?.name ? main.translation.name : main.name;
			const mainImage = main.backgroundImage?.url || "/images/placeholder-category.png";

			return {
				id: item.id,
				href: `/categories/${main.slug}`,
				label: mainName,
				image: mainImage,
			};
		}) ?? [];

	const childItems =
		menu?.items
			?.flatMap(
				(item) =>
					item.category?.children?.edges?.map(({ node }) => {
						const subName = isNotEn && node.translation?.name ? node.translation.name : node.name;
						return {
							id: node.id,
							href: `/categories/${node.slug}`,
							label: subName,
							image: node.backgroundImage?.url || "/images/placeholder-category.png",
						};
					}) ?? [],
			)
			.filter(Boolean) ?? [];

	// ✳ تخصیص به دو بخش اصلی رابط کاربری:
	const sliderItems = mainItems;
	const staticItems = childItems;

	return (
		<section className="mx-auto max-w-7xl p-8 pb-16">
			{/* <h2 className="sr-only">{t("featured_products")}</h2> */}
			{/* <CollectionCategorySlider isRTL={isRTL} items={sliderItems} /> */}
			{/* <CollectionCategorySliderStaticGrouped isRTL={isRTL} groups={groupedItems} /> */}
			<CollectionCategorySliderSplit isRTL={isRTL} sliderItems={sliderItems} staticItems={staticItems} />
			<div className="my-12 h-px w-full bg-gradient-to-r from-amber-200 via-neutral-200 to-amber-200 opacity-60"></div>

			{products.length > 0 && (
				<>
					<h2 className="mb-8 text-center text-2xl font-bold">{t("featured_products")}</h2>
					<ProductList products={products} channel={channel} />
				</>
			)}
		</section>
	);
}
