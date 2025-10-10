"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { LinkWithChannel } from "../atoms/LinkWithChannel";

export const Logo = () => {
	const pathname = usePathname();

	const t = useTranslations("common");
	const companyName = t("site_name");

	if (pathname === "/") {
		return (
			// <h1 className="flex items-center font-bold" aria-label="homepage">
			// 	{companyName}
			// </h1>

			<h1 className="flex items-center whitespace-nowrap font-bold" aria-label="homepage">
				{companyName}
			</h1>
		);
	}
	return (
		// <div className="flex items-center font-bold">
		// 	<LinkWithChannel aria-label="homepage" href="/">
		// 		{companyName}
		// 	</LinkWithChannel>
		// </div>

		<div className="flex items-center whitespace-nowrap font-bold">
			<LinkWithChannel aria-label="homepage" href="/" className="truncate">
				{companyName}
			</LinkWithChannel>
		</div>
	);
};
