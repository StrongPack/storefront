"use client";

import { useTranslations } from "next-intl";
// import React from "react";
import { Title } from "@/checkout/components";
import { LinkAsButton } from "@/checkout/components/LinkAsButton";
import { ErrorContentWrapper } from "@/checkout/components/ErrorContentWrapper";

export const EmptyCartPage = () => {
	const t = useTranslations("common");
	const t2 = useTranslations("checkout");

	return (
		<ErrorContentWrapper>
			<Title className="mb-0 text-xl">{t("cart_empty_title_new")}</Title>
			<p>{t("cart_empty_description_new")}</p>
			<LinkAsButton href="/" variant="secondary">
				{t2("go_back_button")}
			</LinkAsButton>
		</ErrorContentWrapper>
	);
};
