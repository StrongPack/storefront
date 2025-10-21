import React from "react";
import { useTranslations } from "next-intl";
import { PaymentMethods } from "./PaymentMethods";
import { Divider } from "@/checkout/components/Divider";
import { Title } from "@/checkout/components/Title";

export const PaymentSection = () => {
	const t = useTranslations("auth");
	return (
		<>
			<Divider />
			<div className="py-4" data-testid="paymentMethods">
				<Title>{t("paymentMethods")}</Title>
				<PaymentMethods />
			</div>
		</>
	);
};
