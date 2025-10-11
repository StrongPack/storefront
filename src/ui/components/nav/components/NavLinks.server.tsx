// src/ui/components/nav/components/NavLinks.server.tsx
import NavLinksClient from "./NavLinks.client";
import { executeGraphQL } from "@/lib/graphql"; // توجه کن از نسخه server استفاده کن
import { MenuGetBySlugDocument } from "@/gql/graphql";

export default async function NavLinksServer({ channel }: { channel: string }) {
	const { menu } = await executeGraphQL(MenuGetBySlugDocument, {
		variables: { slug: "navbar", channel },
		revalidate: 60 * 60 * 24,
	});

	// داده‌ها رو آماده کنیم برای لایه Client
	const items =
		menu?.items
			?.map((item) => {
				if (item.category) {
					return { id: item.id, href: `/categories/${item.category.slug}`, label: item.category.name };
				}
				if (item.collection) {
					return { id: item.id, href: `/collections/${item.collection.slug}`, label: item.collection.name };
				}
				if (item.page) {
					return { id: item.id, href: `/pages/${item.page.slug}`, label: item.page.title };
				}
				if (item.url) {
					return { id: item.id, href: item.url, label: item.name };
				}
				return null;
			})
			.filter(Boolean) ?? [];

	// return <NavLinksClient items={[{ id: "all", href: "/products", label: "All" }, ...items]} />;
	return <NavLinksClient items={items} />;
}
