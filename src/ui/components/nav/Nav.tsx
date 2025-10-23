import { Suspense } from "react";
// import { useLocale } from "next-intl";
import UserMenuContainer from "./components/UserMenu/UserMenuContainer";
// import { CartNavItem } from "./components/CartNavItem";

import { CartNavItem } from "./components/CartNavItem.server";
import { NavLinks } from "./components/NavLinks";
import { MobileMenu } from "./components/MobileMenu";
// import { SearchBar } from "./components/SearchBar";
import { LanguageSwitcherSPA } from "./components/LanguageSwitcher";
import { type LanguageCodeEnum } from "@/gql/graphql";
// import { useDir } from "@/ui/context/DirContext";

export const Nav = ({
	channel,
	locale,
	languageCode,
}: {
	channel: string;
	locale: string;
	languageCode: LanguageCodeEnum;
}) => {
	// const { isRTL } = useDir();

	// const locale = useLocale();
	const isRTL = locale === "fa";

	return (
		// <nav className="flex w-full gap-4 lg:gap-6" aria-label="Main navigation">
		<nav
			className={`flex w-full gap-4 lg:gap-6 ${isRTL ? "flex-row-reverse" : ""}`}
			aria-label="Main navigation"
		>
			<ul className="hidden gap-4 overflow-x-auto whitespace-nowrap md:flex lg:gap-8 lg:px-0">
				<NavLinks channel={channel} languageCode={languageCode} />
			</ul>
			<div className="ml-auto flex items-center justify-center gap-4 whitespace-nowrap lg:gap-8">
				<div className="hidden lg:flex">{/* <SearchBar channel={channel} locale={locale} /> */}</div>
				<Suspense fallback={<div className="w-8" />}>
					<UserMenuContainer locale={locale} />
				</Suspense>
			</div>
			<div
				className={`${
					isRTL ? "mr-auto" : "ml-auto"
				} flex items-center justify-center gap-4 whitespace-nowrap lg:gap-8`}
			>
				<div className="hidden lg:flex">{/* <SearchBar channel={channel} locale={locale} /> */}</div>
				<Suspense fallback={<div className="w-8" />}>
					<UserMenuContainer locale={locale} />
				</Suspense>

				<LanguageSwitcherSPA />
			</div>
			<div className={`${isRTL ? "mr-auto" : "ml-auto"} flex items-center`}>
				<Suspense fallback={<div className="w-6" />}>
					<CartNavItem channel={channel} languageCode={languageCode} />
				</Suspense>
			</div>
			<Suspense>
				<MobileMenu>
					{/* <SearchBar channel={channel} locale={locale} /> */}
					<NavLinks channel={channel} languageCode={languageCode} />
				</MobileMenu>
			</Suspense>
		</nav>
	);
};
