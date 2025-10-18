export const formatDate = (date: Date | number) => {
	return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date);
};

export const formatMoney = (amount: number, currency: string) =>
	new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
	}).format(amount);

export const formatMoneyRange = (
	range: {
		start?: { amount: number; currency: string } | null;
		stop?: { amount: number; currency: string } | null;
	} | null,
) => {
	const { start, stop } = range || {};
	const startMoney = start && formatMoney(start.amount, start.currency);
	const stopMoney = stop && formatMoney(stop.amount, stop.currency);

	if (startMoney === stopMoney) {
		return startMoney;
	}

	return `${startMoney} - ${stopMoney}`;
};

// export function getHrefForVariant({
// 	productSlug,
// 	variantId,
// }: {
// 	productSlug: string;
// 	variantId?: string;
// }): string {
// 	const pathname = `/products/${encodeURIComponent(productSlug)}`;

// 	if (!variantId) {
// 		return pathname;
// 	}

// 	const query = new URLSearchParams({ variant: variantId });
// 	return `${pathname}?${query.toString()}`;
// }

/**
 * Generate product variant URL preserving channel and locale if present.
 */
export function getHrefForVariant({
	productSlug,
	variantId,
	locale,
}: {
	productSlug: string;
	variantId?: string;
	locale?: string;
}): string {
	const encodedSlug = encodeURIComponent(productSlug);
	let pathname = `/products/${encodedSlug}`;
	const query = variantId ? `?variant=${encodeURIComponent(variantId)}` : "";

	// if (channel && locale) {
	// 	pathname = `/${encodeURIComponent(channel)}/${encodeURIComponent(locale)}${pathname}`;
	// }

	if (locale) {
		pathname = `/${encodeURIComponent(locale)}${pathname}`;
	}

	return `${pathname}${query}`;
}
