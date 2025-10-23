"use client";
import { Suspense } from "react";
// import { LanguageSwitcherSPA } from "./components/LanguageSwitcher";
// import { CartNavItem } from "./components/CartNavItem";
// import { CartNavItem } from "./components/CartNavItem.server";
// import CartNavItemClient from "./components/CartNavItem.client"; // Add this import
// import { UserMenuContainer } from "./components/UserMenu/UserMenuContainer";
// import { SearchBar } from "./components/SearchBar";
import { MobileMenu } from "./components/MobileMenu";
// import { NavLinks } from "./components/NavLinks";

// export default function NavClient({ channel: string, locale }) {

// export const NavClient = ({ channel, locale }: { channel: string; locale: string }) => {

export default function NavClient({
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
	// const isRTL = locale === "fa";

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
		<nav className="flex w-full items-center justify-between gap-4 lg:gap-6">
			<div className={`flex items-center gap-4`}>{NavLinks}</div>

			{/* <div className={`flex items-center gap-4 whitespace-nowrap lg:gap-8`}> */}
			<div className="hidden items-center gap-4 whitespace-nowrap lg:flex lg:gap-8">
				<div className="hidden lg:flex">{/* <SearchBar channel={channel} locale={locale} /> */}</div>
				{/* <LanguageSwitcherSPA /> */}
				<Suspense fallback={<div className="w-6" />}>{CartNavItem}</Suspense>
				<Suspense fallback={<div className="w-8" />}>{UserMenu}</Suspense>
			</div>

			{/* منوی موبایل */}
			<Suspense>
				<MobileMenu locale={locale}>
					{/* <SearchBar channel={channel} locale={locale} />
					{NavLinks} */}

					{/* <div className="flex flex-col gap-4 p-4">
						<SearchBar channel={channel} locale={locale} />
						<div className="border-t border-gray-200 pt-4">{NavLinks}</div>
						<div className="flex flex-col gap-3 border-t border-gray-200 pt-4">
							<LanguageSwitcherSPA />
							{CartNavItem}
							{UserMenu}
						</div>
					</div> */}

					<div className="flex h-full flex-col">
						{/* 🔹 بخش بالا - سرچ بار */}
						<div className="p-4">{/* <SearchBar channel={channel} locale={locale} /> */}</div>

						{/* 🔹 بخش پایین - دکمه‌های تمام‌صفحه‌ای */}
						<div className="flex flex-1 flex-col justify-center gap-3 border-t border-gray-200 p-4">
							{/* <LanguageSwitcherSPA /> */}
							{CartNavItem}
							{UserMenu}
						</div>
					</div>
				</MobileMenu>
			</Suspense>
		</nav>
	);
}
