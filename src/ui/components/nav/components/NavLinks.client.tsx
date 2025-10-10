// src/ui/components/nav/components/NavLinks.client.tsx
"use client";

import { NavLink } from "./NavLink";

type NavItem = { id: string; href: string; label: string };

export default function NavLinksClient({ items }: { items: NavItem[] }) {
	return (
		<ul className="hidden gap-4 overflow-x-auto whitespace-nowrap md:flex lg:gap-8 lg:px-0">
			{items.map((item) => (
				<NavLink key={item.id} href={item.href}>
					{item.label}
				</NavLink>
			))}
		</ul>
	);
}
