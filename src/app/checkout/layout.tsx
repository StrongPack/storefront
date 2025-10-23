import { type ReactNode } from "react";
import { cookies } from "next/headers";
// import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { AuthProvider } from "@/ui/components/AuthProvider";
import { getMessages } from "@/lib/getMessages";
import { getChannelConfig } from "@/lib/channelConfig";

export const metadata = {
	title: "Checkout · 20pack",
	description: "Localized checkout flow with Saleor.",
};

// export default function RootLayout(props: { children: ReactNode }) {

// 	return (
// 		<main>
// 			<AuthProvider>{props.children}</AuthProvider>
// 		</main>
// 	);

// }

interface CheckoutLayoutProps {
	children: ReactNode;
}

export default async function RootLayout({ children }: CheckoutLayoutProps) {
	// اینجا کانال را از context یا از default-channel دریافت می‌کنیم:

	const cookieStore = await cookies();
	const channel = cookieStore.get("channel")?.value ?? "default-channel";
	const { locale, dir } = await getChannelConfig(channel);

	const messages = await getMessages(locale);

	return (
		<main lang={locale} dir={dir} className={dir}>
			{/* <html lang={locale} dir={dir}> */}
			{/* <body className={dir === "rtl" ? "rtl" : "ltr"}> */}
			{/* <html lang={locale} dir={dir}>
				<body className={dir === "rtl" ? "rtl font-vazir text-right" : "ltr"}> */}
			<AuthProvider>
				<NextIntlClientProvider locale={locale} messages={messages}>
					{children}
				</NextIntlClientProvider>
			</AuthProvider>
			{/* </body>
			</html> */}
		</main>
	);
}
