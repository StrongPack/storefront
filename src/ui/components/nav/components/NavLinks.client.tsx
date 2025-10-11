// src/ui/components/nav/components/NavLinks.client.tsx
"use client";
import { useTranslations } from "next-intl";
import { NavLink } from "./NavLink";

type NavItem = { id: string; href: string; label: string };

export default function NavLinksClient({ items }: { items: NavItem[] }) {
	const t = useTranslations("common");

	const allProductsItem = { id: "all", href: "/products", label: t("all_product") };

	// return (
	// 	<ul className="hidden gap-4 overflow-x-auto whitespace-nowrap md:flex lg:gap-8 lg:px-0">
	// 		{items.map((item) => (
	// 			<NavLink key={item.id} href={item.href}>
	// 				{item.label}
	// 			</NavLink>
	// 		))}
	// 	</ul>
	// );

	return (
		<ul className="hidden gap-4 overflow-x-auto whitespace-nowrap md:flex lg:gap-8 lg:px-0">
			<NavLink key={allProductsItem.id} href={allProductsItem.href}>
				{allProductsItem.label}
			</NavLink>

			{items.map((item) => (
				<NavLink key={item.id} href={item.href}>
					{item.label}
				</NavLink>
			))}
		</ul>
	);
}
