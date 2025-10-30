// Footer.client.tsx
"use client";

// import { useTranslation } from "next-i18next";
// import { useDir } from "@/ui/context/DirContext";
import Image from "next/image"; // جایگزین برای <img>
import { useTranslations } from "next-intl";
import { LinkWithChannel } from "../../atoms/LinkWithChannel";
// import { ChannelSelect } from "../ChannelSelect";
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
				<div className={`grid grid-cols-1 gap-8 py-16 sm:grid-cols-3 ${isRTL ? "text-right" : "text-left"}`}>
					{footerLinks.menu?.items?.map((item) => {
						// انتخاب ترجمه عنوان اصلی منو
						const displayTitle = isNotEn && item.translation?.name ? item.translation.name : item.name;

						return (
							<div key={item.id}>
								<h3 className="text-sm font-semibold text-neutral-900">{displayTitle}</h3>
								<ul className="mt-4 space-y-4 [&>li]:text-neutral-500">
									{item.children?.map((child) => {
										// صفحه
										if (child.page) {
											const displayPageTitle =
												isNotEn && child.page.translation?.title
													? child.page.translation.title
													: child.page.title;

											return (
												<li key={child.id} className="text-sm">
													<LinkWithChannel href={`/pages/${child.page.slug}`}>
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
													<LinkWithChannel href={`/collections/${child.collection.slug}`}>
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
													<LinkWithChannel href={`/categories/${child.category.slug}`}>
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
													<LinkWithChannel href={child.url}>{displayName}</LinkWithChannel>
												</li>
											);
										}

										return null;
									})}
								</ul>
							</div>
						);
					})}

					{/* 🗺️ Google Map */}
					{/* <div className={`relative -top-6 sm:row-span-2`}> */}
					<div className="overflow-hidden rounded-xl border border-neutral-200 shadow-sm">
						<iframe
							title="20 pack Location"
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13106.082990104609!2d50.809116090187715!3d34.792838421308176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f93ad076841d0ab%3A0x35746d7177820700!2sShokohieh%20industrial%20town%2C%20Qom%2C%20Qom%20Province%2C%20Iran!5e0!3m2!1sen!2s!4v1761839518405!5m2!1sen!2s"
							width="100%"
							height="300"
							style={{ border: 0 }}
							allowFullScreen
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						></iframe>
					</div>
					{/* </div> */}
				</div>

				{/* {channels?.length > 0 && (
					<div className="mb-4 text-neutral-500">
						<label className="flex items-center gap-2 text-sm">
							<span className="text-sm">{t("change_lang")}</span>
							<ChannelSelect channels={channels} variant="footer" />
						</label>
					</div>
				)} */}

				{/* <div
					className={`flex flex-col border-t border-neutral-200 py-10 sm:flex-row ${
						isRTL ? "sm:justify-start" : "sm:justify-end"
					}`}
				>
					<a
						referrerPolicy="origin"
						target="_blank"
						href="https://trustseal.enamad.ir/?id=662386&Code=rjSjruE6FYX9LOcZMBLx5JylAAONJbQo"
					>
						<Image
							src="https://trustseal.enamad.ir/logo.aspx?id=662386&Code=rjSjruE6FYX9LOcZMBLx5JylAAONJbQo"
							alt={t("enamad_alt")}
							width={86}
							height={86}
							referrerPolicy="origin"
							style={{ cursor: "pointer" }}
						/>
					</a>
				</div> */}

				<div
					className={`flex flex-col items-center justify-between border-t border-neutral-200 py-10 sm:flex-row`}
				>
					{/* 🔹 آیکون‌های شبکه‌های اجتماعی */}
					<div className="mb-5 flex items-center gap-6 sm:mb-0">
						{/* تماس تلفنی */}
						<a
							href="tel:+982112345678"
							aria-label="Phone"
							className="transition-all duration-300 hover:-translate-y-1 hover:scale-110"
						>
							<Image
								src="/icons/phone-solid-full.svg"
								alt="Phone"
								width={28}
								height={28}
								className="transition duration-200 hover:brightness-0 hover:drop-shadow-[0_0_6px_#007AFF] hover:invert"
							/>
						</a>

						{/* واتساپ */}
						<a
							href="https://wa.me/989123456789"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="WhatsApp"
							className="transition-all duration-300 hover:-translate-y-1 hover:scale-110"
						>
							<Image
								src="/icons/whatsapp-brands-solid-full.svg"
								alt="WhatsApp"
								width={28}
								height={28}
								className="transition duration-200 hover:brightness-0 hover:drop-shadow-[0_0_6px_#25D366] hover:invert"
							/>
						</a>

						{/* اینستاگرام */}
						<a
							href="https://www.instagram.com/yourpage"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Instagram"
							className="transition-all duration-300 hover:-translate-y-1 hover:scale-110"
						>
							<Image
								src="/icons/instagram-brands-solid-full.svg"
								alt="Instagram"
								width={28}
								height={28}
								className="transition duration-200 hover:brightness-0 hover:drop-shadow-[0_0_6px_#E1306C] hover:invert"
							/>
						</a>

						{/* تلگرام (اختیاری) */}
						{/* <a
							href="https://t.me/yourchannel"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Telegram"
							className="transition-all duration-300 hover:-translate-y-1 hover:scale-110"
						>
							<Image
								src="/icons/telegram-brands-solid-full.svg"
								alt="Telegram"
								width={28}
								height={28}
								className="transition duration-200 hover:brightness-0 hover:drop-shadow-[0_0_6px_#0088CC] hover:invert"
							/>
						</a> */}
					</div>

					{/* 🔹 لوگوی اینماد */}
					<a
						referrerPolicy="origin"
						target="_blank"
						href="https://trustseal.enamad.ir/?id=662386&Code=rjSjruE6FYX9LOcZMBLx5JylAAONJbQo"
					>
						<Image
							src="https://trustseal.enamad.ir/logo.aspx?id=662386&Code=rjSjruE6FYX9LOcZMBLx5JylAAONJbQo"
							alt={t("enamad_alt")}
							width={86}
							height={86}
							referrerPolicy="origin"
							style={{ cursor: "pointer" }}
						/>
					</a>
				</div>
			</div>
		</footer>
	);
};
