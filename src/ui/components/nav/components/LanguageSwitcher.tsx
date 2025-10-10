// "use client";

// import Link from "next/link";
// import { useRouter } from "next/router";

// export const LanguageSwitcher = () => {
// 	const { pathname, query, asPath } = useRouter();

// 	return (
// 		<div>
// 			<Link href={{ pathname, query }} as={asPath} locale="en">
// 				English
// 			</Link>
// 			<Link href={{ pathname, query }} as={asPath} locale="fa">
// 				فارسی
// 			</Link>
// 		</div>
// 	);
// };
//

// "use client";
// import { useRouter, usePathname } from "next/navigation";

// export function LanguageSwitcher() {
// 	const router = useRouter();
// 	const pathname = usePathname();

// 	// const switchLang = (lang: "fa" | "en") => {
// 	// 	router.push(`/${lang}${pathname}`);
// 	// };

// 	const switchLang = (lang: "fa" | "en") => {
// 		const parts = pathname.split("/").filter(Boolean); // مسیر به آرایه ["fa", "products"]
// 		parts[0] = lang; // زبان رو جایگزین کنیم
// 		router.push("/" + parts.join("/"));
// 	};

// 	return (
// 		<div className="flex gap-2">
// 			<button onClick={() => switchLang("fa")}>فارسی</button>
// 			<button onClick={() => switchLang("en")}>English</button>
// 		</div>
// 	);
// }

// "use client";
// import { useTranslation } from "react-i18next";
// import { useDir } from "@/ui/context/DirContext";
// import { useState } from "react";
// // import { i18nInstance } from "@/lib/i18nSingleton";

// export function LanguageSwitcherSPA() {
// 	const { i18n } = useTranslation();
// 	const { dir } = useDir();
// 	const [currentLocale, setCurrentLocale] = useState(dir === "rtl" ? "fa" : "en");

// 	// const handleChange = (lang: "fa" | "en") => {
// 	// 	i18nInstance.changeLanguage(lang);
// 	// 	document.documentElement.setAttribute("dir", lang === "fa" ? "rtl" : "ltr");
// 	// };

// 	// const changeLang = (lang: "fa" | "en") => {
// 	// 	const newDir = lang === "fa" ? "rtl" : "ltr";
// 	// 	i18n.changeLanguage(lang);
// 	// 	document.documentElement.setAttribute("dir", newDir);
// 	// 	setCurrentLocale(lang);
// 	// };

// 	const changeLang = async (lang: "fa" | "en") => {
// 		// ✅ async
// 		const newDir = lang === "fa" ? "rtl" : "ltr";
// 		await i18n.changeLanguage(lang); // ✅ await تا loaded بشه
// 		document.documentElement.setAttribute("dir", newDir);
// 		setCurrentLocale(lang);
// 	};

// 	return (
// 		<div className="flex gap-2">
// 			<button
// 				onClick={() => changeLang("fa")}
// 				className={`rounded px-2 py-1 ${currentLocale === "fa" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
// 			>
// 				فارسی
// 			</button>
// 			<button
// 				onClick={() => changeLang("en")}
// 				className={`rounded px-2 py-1 ${currentLocale === "en" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
// 			>
// 				English
// 			</button>
// 		</div>
// 	);
// }

"use client";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";

export function LanguageSwitcherSPA() {
	const router = useRouter();
	const pathname = usePathname();
	const locale = useLocale();

	// const changeLang = (lang: string) => {
	// 	const newPath = pathname.replace(/^\/(fa|en)/, `/${lang}`);
	// 	router.push(newPath);

	// 	// const newPath = pathname.replace("/en", "/fa");
	// 	// router.push(newPath);
	// };

	const changeLang = (newLocale: string) => {
		if (newLocale === locale) return; // زبان فعلی، کاری نکن

		const parts = pathname.split("/").filter(Boolean);
		if (parts.length < 2) return;

		// const channel = parts[0];
		parts[1] = newLocale;
		const newPath = "/" + parts.join("/");

		router.push(newPath);
	};

	return (
		// <div className="flex gap-2">
		// 	{/* <button className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300" onClick={() => changeLang("fa")}>
		// 		فارسی
		// 	</button>
		// 	<button className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300" onClick={() => changeLang("en")}>
		// 		English
		// 	</button> */}

		// 	{routing.locales.map((l) => (
		// 		<button
		// 			key={l}
		// 			onClick={() => changeLang(l)}
		// 			className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
		// 		>
		// 			{l === "fa" ? "فارسی" : "English"}
		// 		</button>
		// 	))}
		// </div>

		// <div className="flex gap-2">
		// 	{routing.locales.map((locale) => (
		// 		<button
		// 			key={locale}
		// 			onClick={() => changeLang(locale)}
		// 			className={`rounded px-3 py-1 transition ${
		// 				pathname.includes(`/${locale}/`) ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
		// 			}`}
		// 		>
		// 			{locale === "fa" ? "فارسی" : "English"}
		// 		</button>
		// 	))}
		// </div>

		// <div className="flex gap-2">
		// 	{routing.locales.map((l) => (
		// 		<button
		// 			key={l}
		// 			onClick={() => changeLang(l)}
		// 			className={`rounded px-3 py-1 transition-colors ${
		// 				l === locale ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
		// 			}`}
		// 		>
		// 			{l === "fa" ? "فارسی" : "English"}
		// 		</button>
		// 	))}
		// </div>

		// <div className="inline-flex overflow-hidden rounded-full border border-gray-300 bg-gray-100 text-sm font-medium">
		// 	{routing.locales.map((l) => {
		// 		const isActive = l === locale;
		// 		return (
		// 			<button
		// 				key={l}
		// 				onClick={() => changeLang(l)}
		// 				className={`px-4 py-1.5 transition-all ${
		// 					isActive ? "bg-blue-600 text-white shadow" : "bg-transparent text-gray-700 hover:bg-gray-200"
		// 				}`}
		// 			>
		// 				{l === "fa" ? "فارسی" : "English"}
		// 			</button>
		// 		);
		// 	})}
		// </div>

		// 	<div className="flex gap-2">
		// 		{routing.locales.map((l) => {
		// 			const isActive = l === locale;
		// 			const label = l === "fa" ? "فارسی" : "English";
		// 			const flag = l === "fa" ? "🇮🇷" : "🇬🇧";

		// 			return (
		// 				<button
		// 					key={l}
		// 					onClick={() => changeLang(l)}
		// 					className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all ${
		// 						isActive
		// 							? "border-blue-600 bg-blue-50 text-blue-700"
		// 							: "border-gray-300 text-gray-600 hover:bg-gray-100"
		// 					}`}
		// 				>
		// 					<span>{flag}</span>
		// 					{label}
		// 				</button>
		// 			);
		// 		})}
		// 	</div>

		<div className="relative">
			<select
				value={locale}
				onChange={(e) => changeLang(e.target.value)}
				className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
			>
				{routing.locales.map((l) => (
					<option key={l} value={l}>
						{/* {l === "fa" ? "🇮🇷 فارسی" : "🇬🇧 English"} */}
						{l === "fa" ? "🇮🇷 " : "🇬🇧 "}
					</option>
				))}
			</select>
		</div>
	);
}
