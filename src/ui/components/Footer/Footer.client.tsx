// Footer.client.tsx
"use client";

import { useTranslation } from "next-i18next";
import Image from "next/image"; // جایگزین برای <img>
import { LinkWithChannel } from "../../atoms/LinkWithChannel";
import { ChannelSelect } from "../ChannelSelect";
import type { MenuGetBySlugQuery, ChannelsListQuery } from "@/gql/graphql";

type FooterClientProps = {
	footerLinks: MenuGetBySlugQuery;
	channels: ChannelsListQuery | null;
};

// export default function FooterClient({ footerLinks, channels }: FooterClientProps) {
// 	const { t } = useTranslation("common");

export const FooterClient = ({ footerLinks, channels }: FooterClientProps) => {
	const { t } = useTranslation("common");
	return (
		<footer className="border-neutral-300 bg-neutral-50">
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

				{channels?.channels && (
					<div className="mb-4 text-neutral-500">
						<label>
							<span className="text-sm">{t("change_currency")}</span>
							<ChannelSelect channels={channels.channels} />
						</label>
					</div>
				)}

				<div className="flex flex-col justify-between border-t border-neutral-200 py-10 sm:flex-row">
					<a
						referrerPolicy="origin"
						target="_blank"
						href="https://trustseal.enamad.ir/?id=656873&Code=Dc3ffq6gJLoOncmD6PabrEbGFhDxbcDh"
						rel="noopener noreferrer"
					>
						{/* <img
							referrerPolicy="origin"
							src="https://trustseal.enamad.ir/logo.aspx?id=656873&Code=Dc3ffq6gJLoOncmD6PabrEbGFhDxbcDh"
							alt={t("enamad_alt")}
							style={{ cursor: "pointer" }}
						/> */}

						<Image
							src="https://trustseal.enamad.ir/logo.aspx?id=656873&Code=Dc3ffq6gJLoOncmD6PabrEbGFhDxbcDh"
							alt={t("enamad_alt")}
							width={86} // اندازه واقعی لوگو
							height={86}
							style={{ cursor: "pointer" }}
						/>
					</a>
				</div>
			</div>
		</footer>
	);
};
