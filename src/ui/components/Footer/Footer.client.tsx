// Footer.client.tsx
"use client";

// import { useTranslation } from "next-i18next";
// import { useDir } from "@/ui/context/DirContext";
// import Image from "next/image"; // جایگزین برای <img>
import { useTranslations } from "next-intl";
import { LinkWithChannel } from "../../atoms/LinkWithChannel";
// import { ChannelSelect } from "../ChannelSelect";
import { FooterMap } from "./FooterMap";
import { FooterSocial } from "./FooterSocial";
import { FooterTrust } from "./FooterTrust";
import type { MenuGetBySlugQuery, LanguageCodeEnum } from "@/gql/graphql";
// import { useDir } from "@/ui/context/DirContext"; // اضافه کردن

type FooterClientProps = {
	footerLinks: MenuGetBySlugQuery;
	channels: {
		id: string;
		slug: string;
		name: string;
		flag: string;
		dir: "ltr" | "rtl";
		locale: string;
		languageCode: LanguageCodeEnum;
		displayname: string;
	}[];
	dir: "rtl" | "ltr";
	locale: string;
};

// export default function FooterClient({ footerLinks, channels }: FooterClientProps) {

export const FooterClient = ({ footerLinks, dir, locale }: FooterClientProps) => {
	// const { dir } = useDir(); // گرفتن جهت سایت: 'rtl' یا 'ltr'
	// const isRTL = dir === "rtl";
	// const { dir } = useDir();
	// const isRTL = dir === "rtl";
	const t = useTranslations("common");
	const isRTL = dir === "rtl";
	const isNotEn = locale !== "en";
	// console.log(footerLinks);

	return (
		<footer className="border-t border-neutral-200 bg-neutral-50 text-neutral-700">
			<div className="mx-auto max-w-7xl px-4 lg:px-8">
				<div
					className={`grid grid-cols-2 gap-8 py-16 md:grid-cols-2 lg:grid-cols-3 ${
						isRTL ? "text-right" : "text-left"
					}`}
				>
					{footerLinks.menu?.items?.map((item) => {
						// انتخاب ترجمه عنوان اصلی منو
						const displayTitle = isNotEn && item.translation?.name ? item.translation.name : item.name;

						return (
							<div key={item.id}>
								<h3 className="text-sm font-semibold text-neutral-900">{displayTitle}</h3>
								<ul className="mt-4 space-y-4 [&>li]:text-neutral-500">
									{item.children?.map((child) => {
										// صفحه
										if (child.page && child.page.title == "Blog") {
											const displayPageTitle =
												isNotEn && child.page.translation?.title
													? child.page.translation.title
													: child.page.title;

											return (
												<li key={child.id} className="text-sm">
													<LinkWithChannel
														href={`/pages`}
														className="transition-colors duration-200 hover:text-neutral-900"
													>
														{displayPageTitle}
													</LinkWithChannel>
												</li>
											);
										} else if (child.page) {
											const displayPageTitle =
												isNotEn && child.page.translation?.title
													? child.page.translation.title
													: child.page.title;

											return (
												<li key={child.id} className="text-sm">
													<LinkWithChannel
														href={`/pages/${child.page.slug}`}
														className="transition-colors duration-200 hover:text-neutral-900"
													>
														{displayPageTitle}
													</LinkWithChannel>
												</li>
											);
										}

										// مجموعه (Collection)
										if (child.collection) {
											const displayCollectionName =
												isNotEn && child.collection.translation?.name
													? child.collection.translation.name
													: child.collection.name;

											return (
												<li key={child.id} className="text-sm">
													<LinkWithChannel
														href={`/collections/${child.collection.slug}`}
														className="transition-colors duration-200 hover:text-neutral-900"
													>
														{displayCollectionName}
													</LinkWithChannel>
												</li>
											);
										}

										// دسته‌بندی (Category)
										if (child.category) {
											const displayCategoryName =
												isNotEn && child.category.translation?.name
													? child.category.translation.name
													: child.category.name;

											return (
												<li key={child.id} className="text-sm">
													<LinkWithChannel
														href={`/categories/${child.category.slug}`}
														className="transition-colors duration-200 hover:text-neutral-900"
													>
														{displayCategoryName}
													</LinkWithChannel>
												</li>
											);
										}

										// لینک سفارشی (URL)
										if (child.url) {
											const displayName =
												isNotEn && child.translation?.name ? child.translation.name : child.name;

											return (
												<li key={child.id} className="text-sm">
													<LinkWithChannel
														href={child.url}
														className="transition-colors duration-200 hover:text-neutral-900"
													>
														{displayName}
													</LinkWithChannel>
												</li>
											);
										}

										return null;
									})}
								</ul>
							</div>
						);
					})}

					{/* Footer Map */}
					<div className="col-span-2 lg:col-span-1">
						<FooterMap />
					</div>
				</div>

				{/* {channels?.length > 0 && (
					<div className="mb-4 text-neutral-500">
						<label className="flex items-center gap-2 text-sm">
							<span className="text-sm">{t("change_lang")}</span>
							<ChannelSelect channels={channels} variant="footer" />
						</label>
					</div>
				)} */}
				<div
					className={`flex flex-col items-center justify-between border-t border-neutral-200 py-10 sm:flex-row`}
				>
					<FooterSocial />
					<FooterTrust altText={t("enamad_alt")} />
				</div>
			</div>
		</footer>
	);
};
