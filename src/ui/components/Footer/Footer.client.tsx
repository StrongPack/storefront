// Footer.client.tsx
"use client";

// import { useTranslation } from "next-i18next";
// import { useDir } from "@/ui/context/DirContext";
import Image from "next/image"; // جایگزین برای <img>
import { useTranslations } from "next-intl";
import { LinkWithChannel } from "../../atoms/LinkWithChannel";
import { ChannelSelect } from "../ChannelSelect";
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
};

// export default function FooterClient({ footerLinks, channels }: FooterClientProps) {

export const FooterClient = ({ footerLinks, channels, dir }: FooterClientProps) => {
	// const { dir } = useDir(); // گرفتن جهت سایت: 'rtl' یا 'ltr'
	// const isRTL = dir === "rtl";
	// const { dir } = useDir();
	// const isRTL = dir === "rtl";
	const t = useTranslations("common");
	const isRTL = dir === "rtl";

	return (
		<footer className="border-t border-neutral-200 bg-neutral-50 text-neutral-700">
			<div className="mx-auto max-w-7xl px-4 lg:px-8">
				<div className="grid grid-cols-3 gap-8 py-16">
					{footerLinks.menu?.items?.map((item) => (
						<div key={item.id}>
							<h3 className="text-sm font-semibold text-neutral-900">{item.name}</h3>
							<ul className="mt-4 space-y-4 [&>li]:text-neutral-500">
								{item.children?.map((child) => {
									if (child.category)
										return (
											<li key={child.id} className="text-sm">
												<LinkWithChannel href={`/categories/${child.category.slug}`}>
													{child.category.name}
												</LinkWithChannel>
											</li>
										);
									if (child.collection)
										return (
											<li key={child.id} className="text-sm">
												<LinkWithChannel href={`/collections/${child.collection.slug}`}>
													{child.collection.name}
												</LinkWithChannel>
											</li>
										);
									if (child.page)
										return (
											<li key={child.id} className="text-sm">
												<LinkWithChannel href={`/pages/${child.page.slug}`}>
													{child.page.title}
												</LinkWithChannel>
											</li>
										);
									if (child.url)
										return (
											<li key={child.id} className="text-sm">
												<LinkWithChannel href={child.url}>{child.name}</LinkWithChannel>
											</li>
										);
									return null;
								})}
							</ul>
						</div>
					))}
				</div>

				{channels?.length > 0 && (
					<div className="mb-4 text-neutral-500">
						<label className="flex items-center gap-2 text-sm">
							<span className="text-sm">{t("change_currency")}</span>
							<ChannelSelect channels={channels} />
						</label>
					</div>
				)}

				<div
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
				</div>
			</div>
		</footer>
	);
};
