import React from "react";
import { useTranslations } from "next-intl";
import { PaymentMethods } from "./PaymentMethods";
import { Divider } from "@/checkout/components/Divider";
import { Title } from "@/checkout/components/Title";
import { type LanguageCodeEnum } from "@/gql/graphql";
// export const PaymentSection = ({ languageCode }: { languageCode: LanguageCodeEnum }) => {

export const PaymentSection: React.FC<{ languageCode: LanguageCodeEnum }> = ({ languageCode }) => {
	const t = useTranslations("auth");
	return (
		<>
			<Divider />
			<div className="py-4" data-testid="paymentMethods">
				<Title>{t("paymentMethods")}</Title>
				<PaymentMethods languageCode={languageCode} />
			</div>
		</>
	);
};
