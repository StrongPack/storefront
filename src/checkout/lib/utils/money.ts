import { type MightNotExist } from "@/checkout/lib/globalTypes";

export type Money = {
	currency: string;
	amount: number;
} | null;

// export const getFormattedMoney = <TMoney extends Money>(money: MightNotExist<TMoney>, negative = false) => {
// 	if (!money) {
// 		return "";
// 	}

// 	const { amount, currency } = money;

// 	return new Intl.NumberFormat("en-US", {
// 		style: "currency",
// 		currency,
// 		currencyDisplay: "symbol",
// 	}).format(negative ? -amount : amount);
// };

export const getFormattedMoney = <TMoney extends Money>(
	money: MightNotExist<TMoney>,
	locale?: string,
	negative = false,
) => {
	if (!money) return "";

	const { amount, currency } = money;

	if (currency === "IRR") {
		if (locale === "fa") {
			const formatted = new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 0 }).format(
				Math.round(negative ? -amount : amount),
			);
			return `${formatted} ریال`;
		}

		const formatted = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
			Math.round(negative ? -amount : amount),
		);
		return `${formatted} IRR`;
	}

	const nfLocale = locale === "fa" ? "fa-IR" : "en-US";
	return new Intl.NumberFormat(nfLocale, { style: "currency", currency, currencyDisplay: "symbol" }).format(
		negative ? -amount : amount,
	);
};
