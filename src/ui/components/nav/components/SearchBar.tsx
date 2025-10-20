// import { redirect } from "next/navigation";
// import { SearchIcon } from "lucide-react";

// export const SearchBar = ({ channel }: { channel: string }) => {
// 	async function onSubmit(formData: FormData) {
// 		"use server";
// 		const search = formData.get("search") as string;
// 		if (search && search.trim().length > 0) {
// 			redirect(`/${encodeURIComponent(channel)}/search?query=${encodeURIComponent(search)}`);
// 		}
// 	}

// 	return (
// 		<form
// 			action={onSubmit}
// 			className="group relative my-2 flex w-full items-center justify-items-center text-sm lg:w-80"
// 		>
// 			<label className="w-full">
// 				<span className="sr-only">search for products</span>
// 				<input
// 					type="text"
// 					name="search"
// 					placeholder="Search for products..."
// 					autoComplete="on"
// 					required
// 					className="h-10 w-full rounded-md border border-neutral-300 bg-transparent bg-white px-4 py-2 pr-10 text-sm text-black placeholder:text-neutral-500 focus:border-black focus:ring-black"
// 				/>
// 			</label>
// 			<div className="absolute inset-y-0 right-0">
// 				<button
// 					type="submit"
// 					className="inline-flex aspect-square w-10 items-center justify-center text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 group-invalid:pointer-events-none group-invalid:opacity-80"
// 				>
// 					<span className="sr-only">search</span>
// 					<SearchIcon aria-hidden className="h-5 w-5" />
// 				</button>
// 			</div>
// 		</form>
// 	);
// };

"use client";

import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { searchAction } from "./actions/search";

export const SearchBar = ({ channel, locale }: { channel: string; locale: string }) => {
	const t = useTranslations("common");
	return (
		<form
			action={async (formData: FormData) => searchAction(formData, channel, locale)}
			className="group relative my-2 flex w-full items-center justify-items-center text-sm lg:w-80"
		>
			<label className="w-full">
				<span className="sr-only">{t("search_label")}</span>
				<input
					type="text"
					name="search"
					// placeholder="Search for products..."
					// placeholder={locale === "fa" ? "جستجو در محصولات..." : "Search for products..."}
					placeholder={t("search_placeholder")}
					autoComplete="on"
					required
					dir={locale === "fa" ? "rtl" : "ltr"}
					className={`h-10 w-full rounded-md border border-neutral-300 bg-transparent bg-white  text-sm text-black placeholder:text-neutral-500 focus:border-black focus:ring-black ${
						locale === "fa" ? "text-right" : "text-left"
					}`}
				/>
			</label>
			<div
				// className="absolute inset-y-0 right-0"
				className={`absolute inset-y-0 ${locale === "fa" ? "left-0 pl-1" : "right-0 pr-1"}`}
			>
				<button
					type="submit"
					className="inline-flex aspect-square w-10 items-center justify-center text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 group-invalid:pointer-events-none group-invalid:opacity-80"
				>
					<span className="sr-only">{t("search_button_label")}</span>
					<SearchIcon aria-hidden className="h-5 w-5" />
				</button>
			</div>
		</form>
	);
};
