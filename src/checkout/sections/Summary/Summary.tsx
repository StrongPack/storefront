"use client";

import { type FC } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { SummaryItem, type SummaryLine } from "./SummaryItem";
import { PromoCodeAdd } from "./PromoCodeAdd";
import { SummaryMoneyRow } from "./SummaryMoneyRow";
import { SummaryPromoCodeRow } from "./SummaryPromoCodeRow";
import { SummaryItemMoneyEditableSection } from "./SummaryItemMoneyEditableSection";
import { ChevronDownIcon } from "@/checkout/ui-kit/icons";

import { getFormattedMoney } from "@/checkout/lib/utils/money";
import { Divider, Money, Title } from "@/checkout/components";
import {
	type CheckoutLineFragment,
	type GiftCardFragment,
	type Money as MoneyType,
	type OrderLineFragment,
} from "@/checkout/graphql";
import { SummaryItemMoneySection } from "@/checkout/sections/Summary/SummaryItemMoneySection";
import { type GrossMoney, type GrossMoneyWithTax } from "@/checkout/lib/globalTypes";
import { type LanguageCodeEnum } from "@/gql/graphql";
interface SummaryProps {
	editable?: boolean;
	lines: SummaryLine[];
	totalPrice?: GrossMoneyWithTax;
	subtotalPrice?: GrossMoney;
	giftCards?: GiftCardFragment[];
	voucherCode?: string | null;
	discount?: MoneyType | null;
	shippingPrice: GrossMoney;
	locale: string;
	languageCode: LanguageCodeEnum;
}

export const Summary: FC<SummaryProps> = ({
	editable = true,
	lines,
	totalPrice,
	subtotalPrice,
	giftCards = [],
	voucherCode,
	shippingPrice,
	discount,
	locale,
	languageCode,
}) => {
	const t = useTranslations("auth");

	return (
		<div
			className={clsx(
				"z-0 flex h-fit w-full flex-col",
				"before:fixed before:bottom-0 before:left-1/2 before:top-0 before:-z-10 before:w-1/2 before:border-l before:border-neutral-200 before:bg-neutral-50 before:content-none before:lg:content-['']",
			)}
		>
			<details open className="group">
				<summary className="-mb-2 flex cursor-pointer flex-row items-center pt-4">
					<Title>{t("summary")}</Title>
					<ChevronDownIcon className="mb-2 group-open:rotate-180" />
				</summary>
				<ul className="py-2" data-testid="SummaryProductList">
					{lines.map((line) => (
						<SummaryItem line={line} key={line?.id}>
							{editable ? (
								<SummaryItemMoneyEditableSection
									line={line as CheckoutLineFragment}
									locale={locale}
									languageCode={languageCode}
								/>
							) : (
								<SummaryItemMoneySection line={line as OrderLineFragment} locale={locale} />
							)}
						</SummaryItem>
					))}
				</ul>
			</details>
			{editable && (
				<>
					<PromoCodeAdd />
					<Divider />
				</>
			)}
			<div className="mt-4 flex max-w-full flex-col">
				<SummaryMoneyRow
					label={t("subtotal")}
					money={subtotalPrice?.gross}
					ariaLabel="subtotal price"
					locale={locale}
				/>
				{voucherCode && (
					<SummaryPromoCodeRow
						editable={editable}
						promoCode={voucherCode}
						ariaLabel="voucher"
						locale={locale}
						languageCode={languageCode}
						label={`${t("voucher")}: ${voucherCode}`}
						money={discount}
						negative
					/>
				)}
				{giftCards.map(({ currentBalance, displayCode, id }) => (
					<SummaryPromoCodeRow
						key={id}
						editable={editable}
						promoCodeId={id}
						locale={locale}
						languageCode={languageCode}
						ariaLabel="gift card"
						label={`${t("giftCard")}: •••• •••• ${displayCode}`}
						money={currentBalance}
						negative
					/>
				))}
				<SummaryMoneyRow
					label={t("shippingCost")}
					ariaLabel="shipping cost"
					money={shippingPrice?.gross}
					locale={locale}
				/>
				<Divider className="my-4" />
				<div className="flex flex-row items-baseline justify-between pb-4">
					<div className="flex flex-row items-baseline">
						<p className="font-bold">{t("totalPrice")}</p>
						<p color="secondary" className="ml-2">
							&nbsp;&nbsp;
							{t("includesTax", { tax: getFormattedMoney(totalPrice?.tax, locale) })}
						</p>
					</div>
					<Money
						ariaLabel="total price"
						money={totalPrice?.gross}
						data-testid="totalOrderPrice"
						locale={locale}
					/>
				</div>
			</div>
		</div>
	);
};
