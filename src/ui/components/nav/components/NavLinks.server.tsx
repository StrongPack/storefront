// src/ui/components/nav/components/NavLinks.server.tsx
import NavLinksClient from "./NavLinks.client";
import { executeGraphQL } from "@/lib/graphql"; // توجه کن از نسخه server استفاده کن
import { MenuGetBySlugDocument, type LanguageCodeEnum } from "@/gql/graphql";

export default async function NavLinksServer({
	channel,
	locale,
	languageCode,
}: {
	channel: string;
	locale: string;
	languageCode: LanguageCodeEnum;
}) {
	const { menu } = await executeGraphQL(MenuGetBySlugDocument, {
		variables: { slug: "navbar", channel, languageCode: languageCode },
		revalidate: 60 * 60 * 24,
	});

	const isNotEn = locale !== "en";

	// داده‌ها رو آماده کنیم برای لایه Client
	const items =
		menu?.items
			?.map((item) => {
				if (item.category) {
					const Name =
						isNotEn && item.category?.translation?.name
							? item.category?.translation?.name
							: item.category.name;
					return { id: item.id, href: `/categories/${item.category.slug}`, label: Name };
				}
				if (item.collection) {
					const Name =
						isNotEn && item.collection?.translation?.name
							? item.collection?.translation?.name
							: item.collection.name;
					return { id: item.id, href: `/collections/${item.collection.slug}`, label: Name };
				}

				if (item.page && item.page.title == "Blog") {
					const Title =
						isNotEn && item.page?.translation?.title ? item.page?.translation?.title : item.page.title;
					return { id: item.id, href: `/pages`, label: Title };
				} else if (item.page) {
					const Title =
						isNotEn && item.page?.translation?.title ? item.page?.translation?.title : item.page.title;
					return { id: item.id, href: `/pages/${item.page.slug}`, label: Title };
				}

				if (item.url) {
					const Name = isNotEn && item.translation?.name ? item.translation?.name : item.name;
					return { id: item.id, href: item.url, label: Name };
				}
				return null;
			})
			.filter(Boolean) ?? [];

	// return <NavLinksClient items={[{ id: "all", href: "/products", label: "All" }, ...items]} />;
	return <NavLinksClient items={items} />;
}
