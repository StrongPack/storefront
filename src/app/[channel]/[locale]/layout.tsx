// import { NextIntlClientProvider, useMessages } from "next-intl";
// // import { getMessages } from "next-intl/server";
// import { ReactNode } from "react";
// import { getMessages } from "@/lib/getMessages";
// import "@/i18n/i18n";

// export default async function LocaleLayout({
// 	params,
// 	children,
// }: {
// 	params: Promise<{ channel: string; locale: string }>;
// 	children: ReactNode;
// }) {
// 	// const { children } = props;
// 	// const { channel, locale } = await props.params; // ✅ الان props.params async است
// 	// const messages = useMessages();

// 	// const messages = await getMessages();

// 	const { locale } = await params;
// 	const messages = await getMessages(locale);

// 	return (
// 		<html lang={locale} dir={locale === "fa" ? "rtl" : "ltr"}>
// 			<body>
// 				<NextIntlClientProvider locale={locale} messages={messages}>
// 					{children}
// 				</NextIntlClientProvider>
// 			</body>
// 		</html>
// 	);
// }

// // Generate static params
// export async function generateStaticParams() {
// 	return [
// 		{ channel: "default-channel", locale: "en" },
// 		{ channel: "default-channel", locale: "fa" },
// 	];
// }

import { NextIntlClientProvider } from "next-intl";
// import { notFound } from "next/navigation";
// import { routing } from "@/i18n/routing";
// import { ReactNode } from "react";
// import { getMessages } from "next-intl/server";
import { redirect } from "next/navigation";
import { getMessages } from "@/lib/getMessages";
import ClientDirProvider from "@/ui/components/ClientDirProvider";
// import { DraftModeNotification } from "@/ui/components/DraftModeNotification";
import { routing } from "@/i18n/routing";

// type Props = {
// 	children: ReactNode;
// 	params: { locale: string };
// };

const rtlLocales = ["fa"];

function getDirection(locale: string) {
	return rtlLocales.includes(locale) ? "rtl" : "ltr";
}

// export async function generateStaticParams() {
//   return [{ locale: 'fa' }, { locale: 'en' }];
// }

// export function generateStaticParams() {
// 	return routing.locales.map((locale) => ({ locale }));
// }

export async function generateStaticParams() {
	const channels = ["default-channel"]; // یا از Saleor API بگیر
	const locales = ["en", "fa"];

	return channels.flatMap((channel) => locales.map((locale) => ({ channel, locale })));
}

// export default async function RootLayout({
// 	children,
// 	params,
// }: {
// 	children: React.ReactNode;
// 	params: Promise<{ locale: string }>;
// }) {
// 	const { locale } = await params;
// 	if (!hasLocale(routing.locales, locale)) {
// 		notFound();
// 	}

// 	return (
// 		<html lang={locale}>
// 			<body>
// 				<NextIntlClientProvider>{children}</NextIntlClientProvider>
// 			</body>
// 		</html>
// 	);
// }

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ channel: string; locale: string }>;
}) {
	const { channel, locale } = await params;

	// ✅ اگر locale معتبر نیست → ریدایرکت به پیش‌فرض
	if (!routing.locales.includes(locale)) {
		redirect(`/${channel}/${routing.defaultLocale}`);
	}

	// export default async function LocaleLayout({ children, params }: Props) {
	// 	const { locale } = await params; // ✅ لازم است await کنی

	const messages = await getMessages(locale);
	const dir = getDirection(locale);

	return (
		<ClientDirProvider dir={dir}>
			<NextIntlClientProvider locale={locale} messages={messages}>
				{children}
			</NextIntlClientProvider>
		</ClientDirProvider>
	);
}
