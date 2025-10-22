"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { LinkWithChannel } from "../atoms/LinkWithChannel";

export const Logo = () => {
	const pathname = usePathname();

	const t = useTranslations("common");
	const companyName = t("site_name");

	if (pathname === "/") {
		return (
			<h1
				className="flex flex-shrink-0 items-center whitespace-nowrap font-bold"
				style={{ minWidth: 100 }}
				aria-label="homepage"
			>
				<Image src="/20pack.webp" alt={`${companyName} logo`} width={32} height={32} className="mr-2" />
				{companyName}
			</h1>
		);
	}
	return (
		<div className="flex flex-shrink-0 items-center whitespace-nowrap font-bold" style={{ minWidth: 100 }}>
			<LinkWithChannel aria-label="homepage" href="/" className="flex items-center truncate">
				<Image src="/20pack.webp" alt={`${companyName} logo`} width={32} height={32} className="mr-2" />
				{companyName}
			</LinkWithChannel>
		</div>
	);
};
