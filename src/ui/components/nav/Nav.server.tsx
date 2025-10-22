// // src/ui/components/nav/Nav.server.tsx
// import { cookies } from "next/headers";
// // import { getCheckout } from "@/lib/checkout";
// // import { getCurrentUser } from "@/lib/auth";
// import { NavClient } from "./Nav.client";

// export default async function NavServer({ channel }: { channel: string }) {
// 	const cookieStore = cookies();
// 	// const checkout = await getCheckout(channel, cookieStore);
// 	// const user = await getCurrentUser();
// 	// locale را معمولا از context در layout هم می‌توانی پاس بدهی
// 	const locale = (await cookieStore).get("NEXT_LOCALE")?.value || "en";

// 	return <NavClient channel={channel} locale={locale} />;
// }
// import { useLocale } from "next-intl";
// import { cookies } from "next/headers";
// import * as Checkout from "@/lib/checkout"; // Add this import
// import { getCheckout } from "@/lib/checkout"; // Remove if unused
// import { getCurrentUser } from "@/lib/auth";
import NavClient from "./Nav.client";
import NavLinksServer from "./components/NavLinks.server";
import { CartNavItem } from "./components/CartNavItem.server";
import UserMenuContainer from "./components/UserMenu/UserMenuContainer";

export default async function NavServer({ channel, locale }: { channel: string; locale: string }) {
	// const cookieStore = await cookies();
	// const checkout = await getCheckout(channel, cookieStore); // Remove if unused
	// const user = await getCurrentUser(); // Remove if unused
	// const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
	// const locale = useLocale();
	// // Move cart logic here (server-side)
	// const checkoutId = await Checkout.getIdFromCookies(channel);
	// const checkout = checkoutId ? await Checkout.find(checkoutId) : null;
	// const lineCount = checkout ? checkout.lines?.reduce((total, line) => total + line.quantity, 0) : 0;

	return (
		<NavClient
			channel={channel}
			locale={locale}
			NavLinks={<NavLinksServer channel={channel} locale={locale} />}
			CartNavItem={<CartNavItem channel={channel} />}
			UserMenu={<UserMenuContainer locale={locale} />}
		/>
	);
}
