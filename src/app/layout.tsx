import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
// import type { ReactNode } from "react";
import type { Metadata } from "next";

// import { appWithTranslation } from "next-i18next";
// import { dir } from "i18next";
// import { languages } from "@/i18n/settings";
// import { PropsWithChildren } from "react";

import { createInstance, type Resource } from "i18next";
// import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { DraftModeNotification } from "@/ui/components/DraftModeNotification";
// import { I18nextProvider } from "react-i18next";
// import i18nextConfig from "../../next-i18next.config";
// import { i18n as i18nConfig } from "../../next-i18next.config"; // named import
// import { I18nextProvider } from "react-i18next";
// import i18nextConfig from "../../next-i18next.config"; // default import

import { ClientI18nProvider } from "@/ui/components/ClientI18nProvider";
// import { DirContext } from "@/ui/context/DirContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "20Pack Storefront",
	description: "Multilingual storefront with RTL/LTR",
	metadataBase: process.env.NEXT_PUBLIC_STOREFRONT_URL
		? new URL(process.env.NEXT_PUBLIC_STOREFRONT_URL)
		: undefined,
};

// تایپ امن برای config
interface NextI18NextConfig {
	i18n: {
		defaultLocale: string;
		locales?: string[];
	};
}

// type AppRouterLayoutProps = {
// 	children: React.ReactNode;
// 	params?: Promise<any>;
// };

type LayoutParams = {
	locale?: string;
};

type RootLayoutProps = {
	children: React.ReactNode;
	params?: Promise<LayoutParams>;
};

// export const RootLayout = async ({
// 	children,
// 	params,
// }: {
// 	children: ReactNode;
// 	params: { locale: string };
// }) => {

/* eslint-disable import/no-default-export */
// export default async function RootLayout({
// 	children,
// 	params,
// }: {
// 	children: React.ReactNode;
// 	params: { locale: string };
// }) {

export default async function RootLayout({ children, params }: RootLayoutProps) {
	// همیشه یا await promise یا مقدار خالی
	const resolvedParams = (await params) ?? {};
	const locale = resolvedParams.locale ?? "fa";
	const isRTL = locale === "fa";

	// export default async function RootLayout(props: { children: ReactNode }) {
	// 	const { children } = props;

	// 	const locale = "fa"; // get from parameters.
	// 	const isRTL = locale === "fa";

	// Dynamic import for the config to handle CommonJS/ESM export properly
	// const i18nConfigModule = await import("../../next-i18next.config");
	// const i18nextConfig = require("../../next-i18next.config.cjs");
	// const i18nConfig = i18nextConfig.default || i18nextConfig; // Fallback for different export styles
	// const defaultLocale = i18nConfig.i18n?.defaultLocale || "fa"; // Safe access with fallback

	// Dynamic import برای config (فیکس require و unsafe access)
	// const configModule = await import("../../next-i18next.config.cjs");
	// const i18nConfig = (configModule.default || configModule) as NextI18NextConfig;
	// const defaultLocale = i18nConfig.i18n.defaultLocale || "fa";

	// Dynamic import امن برای config
	const configModule: NextI18NextConfig = await import("../../next-i18next.config.cjs");
	const i18nConfig = configModule;
	const defaultLocale = i18nConfig.i18n?.defaultLocale ?? "fa";

	// const defaultLocale = "fa";
	const i18nInstance = createInstance();

	await i18nInstance
		// .use(initReactI18next)
		.use(resourcesToBackend((lng: string, ns: string) => import(`../../public/locales/${lng}/${ns}.json`)))
		.init({
			lng: locale,
			ns: ["common"],
			fallbackLng: defaultLocale,
			interpolation: { escapeValue: false },
		});

	// Extract loaded resources for passing to client provider
	const resources: Resource = i18nInstance.services.resourceStore.data;

	return (
		<html lang={locale} dir={isRTL ? "rtl" : "ltr"} className="min-h-dvh">
			<body className={`${inter.className} min-h-dvh`}>
				{/* <I18nextProvider i18n={i18nInstance}> */}
				{/* {children}
				<Suspense>
					<DraftModeNotification />
				</Suspense> */}
				{/* </I18nextProvider> */}

				{/* <ClientI18nProvider initialResources={resources} lng={locale} defaultLocale={defaultLocale}>
					<DirContext.Provider value={{ isRTL }}>{children}</DirContext.Provider>
				</ClientI18nProvider> */}

				{/* <DirContext.Provider value={{ isRTL }}> */}
				<ClientI18nProvider initialResources={resources} lng={locale} defaultLocale={defaultLocale}>
					{children}
				</ClientI18nProvider>
				{/* </DirContext.Provider> */}

				<Suspense>
					<DraftModeNotification />
				</Suspense>
			</body>
		</html>
	);
}
