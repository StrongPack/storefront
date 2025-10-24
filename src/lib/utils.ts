export const formatDate = (date: Date | number) => {
	return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date);
};
export const CURRENCY_CONFIG = {
	IRR: {
		faName: "ریال",
		enName: "IRR",
		maximumFractionDigits: 0,
	},
	SAR: {
		faName: "ریال",
		enName: "SAR",
		maximumFractionDigits: 0,
	},
	TRY: {
		faName: "لیر",
		enName: "TRY",
		maximumFractionDigits: 0,
	},
	USD: {
		faName: "دلار",
		enName: "USD",
		maximumFractionDigits: 2,
	},
} as const;

export const formatMoney = (amount: number, currency: string, locale?: string) => {
	const nfLocale = locale === "fa" || locale === "ar" ? "fa-IR" : "en-US";
	const isRTL = locale === "fa" || locale === "ar";

	const customCurrency = CURRENCY_CONFIG[currency as keyof typeof CURRENCY_CONFIG];

	if (customCurrency) {
		const formatted = new Intl.NumberFormat(nfLocale, {
			maximumFractionDigits: customCurrency.maximumFractionDigits,
		}).format(Math.round(amount));

		const currencyName = isRTL ? customCurrency.faName : customCurrency.enName;
		return `${formatted} ${currencyName}`;
	}

	// برای ارزهای استاندارد
	return new Intl.NumberFormat(nfLocale, {
		style: "currency",
		currency,
		currencyDisplay: "symbol",
	}).format(amount);
};
// export const formatMoney = (amount: number, currency: string, locale?: string) => {
// 	const nfLocale = locale === "fa" || locale === "ar" ? "fa-IR" : "en-US";

// 	if (currency === "IRR") {
// 		const formatted = new Intl.NumberFormat(nfLocale, { maximumFractionDigits: 0 }).format(
// 			Math.round(amount),
// 		);
// 		if (locale === "fa" || locale === "ar") return `${formatted} ریال`;

// 		return `${formatted} IRR`;
// 	}

// 	if (currency === "SAR") {
// 		const formatted = new Intl.NumberFormat(nfLocale, { maximumFractionDigits: 0 }).format(
// 			Math.round(amount),
// 		);
// 		if (locale === "fa" || locale === "ar") return `${formatted} ریال`;

// 		return `${formatted} SAR`;
// 	}

// 	if (currency === "TRY") {
// 		const formatted = new Intl.NumberFormat(nfLocale, { maximumFractionDigits: 0 }).format(
// 			Math.round(amount),
// 		);
// 		if (locale === "fa" || locale === "ar") return `${formatted} لیر`;

// 		return `${formatted} TRY`;
// 	}

// 	const formatted = new Intl.NumberFormat(nfLocale, {
// 		style: "currency",
// 		currency,
// 	}).format(amount);

// 	if (locale === "fa" || locale === "ar") return `${formatted} دلار`;

// 	return `${formatted} USD`;
// };

export const formatMoneyRange = (
	range: {
		start?: { amount: number; currency: string } | null;
		stop?: { amount: number; currency: string } | null;
	} | null,
	locale?: string,
) => {
	const { start, stop } = range || {};
	const startMoney = start && formatMoney(start.amount, start.currency, locale);
	const stopMoney = stop && formatMoney(stop.amount, stop.currency, locale);

	if (startMoney === stopMoney) {
		return startMoney;
	}

	return `${startMoney} - ${stopMoney}`;
};

export const formatNumber = (number: number, locale?: string) => {
	const nfLocale = locale === "fa" || locale === "ar" ? "fa-IR" : "en-US";
	return new Intl.NumberFormat(nfLocale, { maximumFractionDigits: 0 }).format(Math.round(number));
};

export function getHrefForVariant({
	productSlug,
	variantId,
}: {
	productSlug: string;
	variantId?: string;
}): string {
	const pathname = `/products/${encodeURIComponent(productSlug)}`;

	if (!variantId) {
		return pathname;
	}

	const query = new URLSearchParams({ variant: variantId });
	return `${pathname}?${query.toString()}`;
}

/**
 * Generate product variant URL preserving channel and locale if present.
 */
// export function getHrefForVariant({
// 	productSlug,
// 	variantId,
// 	locale,
// }: {
// 	productSlug: string;
// 	variantId?: string;
// 	locale?: string;
// }): string {
// 	const encodedSlug = encodeURIComponent(productSlug);
// 	let pathname = `/products/${encodedSlug}`;
// 	const query = variantId ? `?variant=${encodeURIComponent(variantId)}` : "";

// 	// if (channel && locale) {
// 	// 	pathname = `/${encodeURIComponent(channel)}/${encodeURIComponent(locale)}${pathname}`;
// 	// }

// 	if (locale) {
// 		pathname = `/${encodeURIComponent(locale)}${pathname}`;
// 	}

// 	return `${pathname}${query}`;
// }
