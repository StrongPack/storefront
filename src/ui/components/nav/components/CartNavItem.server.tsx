// src/ui/components/nav/components/CartNavItem.server.tsx
// import { ShoppingBagIcon } from "lucide-react";
// import clsx from "clsx";
import CartNavItemClient from "./CartNavItem.client";
import * as Checkout from "@/lib/checkout";
import { type LanguageCodeEnum } from "@/gql/graphql";
// import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

// export default async function CartNavItem({ channel }: { channel: string }) {
export const CartNavItem = async ({
	channel,
	languageCode,
}: {
	channel: string;
	languageCode: LanguageCodeEnum;
}) => {
	// تمام منطق سروری و cookie این‌جا است
	const checkoutId = await Checkout.getIdFromCookies(channel);
	const checkout = checkoutId ? await Checkout.find(checkoutId, languageCode) : null;

	const lineCount = checkout ? checkout.lines?.reduce((total, line) => total + line.quantity, 0) : 0;

	// داده را به نسخه‌ی کلاینتی پاس بده
	return <CartNavItemClient lineCount={lineCount} />;
};
