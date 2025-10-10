import { Suspense } from "react";
import UserMenuContainer from "./components/UserMenu/UserMenuContainer";
// import { CartNavItem } from "./components/CartNavItem";

import { CartNavItem } from "./components/CartNavItem.server";
import { NavLinks } from "./components/NavLinks";
import { MobileMenu } from "./components/MobileMenu";
import { SearchBar } from "./components/SearchBar";
import { LanguageSwitcherSPA } from "./components/LanguageSwitcher";

// import { useDir } from "@/ui/context/DirContext";

export const Nav = ({ channel }: { channel: string }) => {
	// const { isRTL } = useDir();
	const isRTL = "fa";

	return (
		// <nav className="flex w-full gap-4 lg:gap-6" aria-label="Main navigation">
		<nav
			className={`flex w-full gap-4 lg:gap-6 ${isRTL ? "flex-row-reverse" : ""}`}
			aria-label="Main navigation"
		>
			<ul className="hidden gap-4 overflow-x-auto whitespace-nowrap md:flex lg:gap-8 lg:px-0">
				<NavLinks channel={channel} />
			</ul>
			<div className="ml-auto flex items-center justify-center gap-4 whitespace-nowrap lg:gap-8">
				<div className="hidden lg:flex">
					<SearchBar channel={channel} />
				</div>
				<Suspense fallback={<div className="w-8" />}>
					<UserMenuContainer />
				</Suspense>
			</div>
			<div
				className={`${
					isRTL ? "mr-auto" : "ml-auto"
				} flex items-center justify-center gap-4 whitespace-nowrap lg:gap-8`}
			>
				<div className="hidden lg:flex">
					<SearchBar channel={channel} />
				</div>
				<Suspense fallback={<div className="w-8" />}>
					<UserMenuContainer />
				</Suspense>

				<LanguageSwitcherSPA />
			</div>
			<div className={`${isRTL ? "mr-auto" : "ml-auto"} flex items-center`}>
				<Suspense fallback={<div className="w-6" />}>
					<CartNavItem channel={channel} />
				</Suspense>
			</div>
			<Suspense>
				<MobileMenu>
					<SearchBar channel={channel} />
					<NavLinks channel={channel} />
				</MobileMenu>
			</Suspense>
		</nav>
	);
};
