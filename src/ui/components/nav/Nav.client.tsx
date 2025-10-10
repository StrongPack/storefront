"use client";
import { Suspense } from "react";
import { LanguageSwitcherSPA } from "./components/LanguageSwitcher";
// import { CartNavItem } from "./components/CartNavItem";
// import { CartNavItem } from "./components/CartNavItem.server";
// import CartNavItemClient from "./components/CartNavItem.client"; // Add this import
// import { UserMenuContainer } from "./components/UserMenu/UserMenuContainer";
import { SearchBar } from "./components/SearchBar";
import { MobileMenu } from "./components/MobileMenu";
// import { NavLinks } from "./components/NavLinks";

// export default function NavClient({ channel: string, locale }) {

// export const NavClient = ({ channel, locale }: { channel: string; locale: string }) => {

export default function NavClient({
	channel,
	locale,
	// lineCount,
	NavLinks,
	CartNavItem,
	UserMenu,
}: {
	channel: string;
	locale: string;
	// lineCount: number;
	NavLinks: React.ReactNode;
	CartNavItem: React.ReactNode;
	UserMenu: React.ReactNode;
}) {
	// Add lineCount prop
	const isRTL = locale === "fa";

	// return (
	// 	<nav dir={isRTL ? "rtl" : "ltr"} className={`flex w-full items-center justify-between gap-4 lg:gap-6`}>
	// 		{/* --- برای LTR/NavLinks در سمت چپ، برای RTL در سمت راست --- */}
	// 		<div
	// 			className={`flex items-center gap-4 ${
	// 				isRTL ? "order-last flex-row-reverse" : "order-first flex-row"
	// 			}`}
	// 		>
	// 			{NavLinks}
	// 		</div>

	// 		{/* --- برای بخش Search + User + Lang + Cart --- */}
	// 		<div
	// 			className={`flex items-center gap-4 whitespace-nowrap lg:gap-8 ${
	// 				isRTL ? "order-first ml-auto flex-row-reverse" : "order-last mr-auto flex-row"
	// 			}`}
	// 		>
	// 			{/* Search box فقط در سایز بزرگ */}
	// 			<div className="hidden lg:flex">
	// 				<SearchBar channel={channel} />
	// 			</div>
	// 			{/* User menu */}
	// 			<Suspense fallback={<div className="w-8" />}>{UserMenu}</Suspense>

	// 			{/* زبان */}
	// 			<LanguageSwitcherSPA />

	// 			{/* Cart */}
	// 			<Suspense fallback={<div className="w-6" />}>{CartNavItem}</Suspense>
	// 		</div>

	// 		<Suspense>
	// 			<MobileMenu>
	// 				<SearchBar channel={channel} />
	// 				{NavLinks}
	// 			</MobileMenu>
	// 		</Suspense>
	// 	</nav>
	// );

	return (
		<nav dir={isRTL ? "rtl" : "ltr"} className="flex w-full items-center justify-between gap-4 lg:gap-6">
			{/* بخش لینک‌ها (NavLinks) */}
			<div
				className={`flex items-center gap-4 ${
					isRTL
						? "order-2 flex-row-reverse" // در RTL سمت راست
						: "order-1 flex-row" // در LTR سمت چپ
				}`}
			>
				{NavLinks}
			</div>

			{/* بخش جستجو، کاربر، زبان، سبد */}
			<div
				className={`flex items-center gap-4 whitespace-nowrap lg:gap-8 ${
					isRTL
						? "order-1 ml-auto flex-row-reverse" // در RTL سمت چپ
						: "order-2 mr-auto flex-row" // در LTR سمت راست
				}`}
			>
				<div className="hidden lg:flex">
					<SearchBar channel={channel} />
				</div>

				<Suspense fallback={<div className="w-8" />}>{UserMenu}</Suspense>
				<LanguageSwitcherSPA />
				<Suspense fallback={<div className="w-6" />}>{CartNavItem}</Suspense>
			</div>

			{/* منوی موبایل */}
			<Suspense>
				<MobileMenu>
					<SearchBar channel={channel} />
					{NavLinks}
				</MobileMenu>
			</Suspense>
		</nav>
	);
}
