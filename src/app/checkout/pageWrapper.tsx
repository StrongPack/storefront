"use client";

import dynamic from "next/dynamic";
import { type LanguageCodeEnum } from "@/gql/graphql";

const Root = dynamic(() => import("@/checkout/Root").then((m) => m.Root), { ssr: false });

export const RootWrapper = ({
	saleorApiUrl,
	locale,
	languageCode,
}: {
	saleorApiUrl: string;
	locale: string;
	languageCode: LanguageCodeEnum;
}) => {
	if (!saleorApiUrl) {
		return null;
	}
	return <Root saleorApiUrl={saleorApiUrl} locale={locale} languageCode={languageCode} />;
};
