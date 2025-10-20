import { type ReactNode } from "react";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { AuthProvider } from "@/ui/components/AuthProvider";
import { getMessages } from "@/lib/getMessages";

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

export default async function RootLayout({ children }: { children: ReactNode }) {
	const locale = await getLocale();
	const messages = await getMessages(locale);
	const dir = locale === "fa" ? "rtl" : "ltr";

	return (
		<main lang={locale} dir={dir} className={dir}>
			{/* <html lang={locale} dir={dir}> */}
			{/* <body className={dir === "rtl" ? "rtl" : "ltr"}> */}
			<AuthProvider>
				<NextIntlClientProvider locale={locale} messages={messages}>
					{children}
				</NextIntlClientProvider>
			</AuthProvider>
			{/* </body> */}
			{/* </html> */}
		</main>
	);
}
