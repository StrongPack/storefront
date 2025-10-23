"use client";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { Summary, SummarySkeleton } from "@/checkout/sections/Summary";
import { OrderInfo } from "@/checkout/sections/OrderInfo";
import { useOrder } from "@/checkout/hooks/useOrder";
import { type LanguageCodeEnum } from "@/gql/graphql";
export const OrderConfirmation = ({
	locale,
	languageCode,
}: {
	locale: string;
	languageCode: LanguageCodeEnum;
}) => {
	const { order } = useOrder(languageCode);
	const t = useTranslations("checkout");

	return (
		<main className="grid grid-cols-1 gap-x-16 lg:grid-cols-2">
			<div>
				<header>
					<p className="mb-2 text-lg font-bold" data-testid="orderConfirmationTitle">
						{t("order_confirmed_title", { number: order.number })}
					</p>
					<p className="text-base">{t("order_confirmed_text", { email: order.userEmail || "" })}</p>
				</header>

				<OrderInfo languageCode={languageCode} />
			</div>
			<Suspense fallback={<SummarySkeleton />}>
				<Summary
					{...order}
					locale={locale}
					languageCode={languageCode}
					// for now there can only be one voucher per order in the api
					discount={order?.discounts?.find(({ type }) => type === "VOUCHER")?.amount}
					voucherCode={order?.voucher?.code}
					totalPrice={order?.total}
					subtotalPrice={order?.subtotal}
					editable={false}
				/>
			</Suspense>
		</main>
	);
};
