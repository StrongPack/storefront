import { cookies } from "next/headers";
import { CheckoutCreateDocument, CheckoutFindDocument, type LanguageCodeEnum } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";

export async function getIdFromCookies(channel: string) {
	const cookieName = `checkoutId-${channel}`;
	const checkoutId = (await cookies()).get(cookieName)?.value || "";
	return checkoutId;
}

export async function saveIdToCookie(channel: string, checkoutId: string) {
	const shouldUseHttps =
		process.env.NEXT_PUBLIC_STOREFRONT_URL?.startsWith("https") || !!process.env.NEXT_PUBLIC_VERCEL_URL;
	const cookieName = `checkoutId-${channel}`;
	(await cookies()).set(cookieName, checkoutId, {
		sameSite: "lax",
		secure: shouldUseHttps,
	});
}

export async function find(checkoutId: string, languageCode: LanguageCodeEnum) {
	try {
		const { checkout } = checkoutId
			? await executeGraphQL(CheckoutFindDocument, {
					variables: {
						id: checkoutId,
						languageCode: languageCode,
					},
					cache: "no-cache",
				})
			: { checkout: null };

		return checkout;
	} catch {
		// we ignore invalid ID or checkout not found
	}
}

export async function findOrCreate({
	channel,
	checkoutId,
	languageCode,
}: {
	checkoutId?: string;
	channel: string;
	languageCode: LanguageCodeEnum;
}) {
	if (!checkoutId) {
		return (await create({ channel })).checkoutCreate?.checkout;
	}
	const checkout = await find(checkoutId, languageCode);
	return checkout || (await create({ channel })).checkoutCreate?.checkout;
}

export const create = ({ channel }: { channel: string }) =>
	executeGraphQL(CheckoutCreateDocument, { cache: "no-cache", variables: { channel } });
