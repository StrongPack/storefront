import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import type { Metadata } from "next";
// import { createInstance, type Resource } from "i18next";
// import resourcesToBackend from "i18next-resources-to-backend";
import { DraftModeNotification } from "@/ui/components/DraftModeNotification";
// import { ClientI18nProvider } from "@/ui/components/ClientI18nProvider";
// import { i18nInstance } from "@/lib/i18nSingleton";
// import { DirContext } from "@/ui/context/DirContext";
// import ClientDirProvider from "@/ui/components/ClientDirProvider"; // Adjust path as needed

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "20Pack",
	description: "20pack",

	manifest: "/site.webmanifest",
	icons: {
		icon: "/favicon.ico",
		apple: "/apple-touch-icon.webp",
	},
	metadataBase: process.env.NEXT_PUBLIC_STOREFRONT_URL
		? new URL(process.env.NEXT_PUBLIC_STOREFRONT_URL)
		: undefined,
};

// interface NextI18NextConfig {
// 	i18n: {
// 		defaultLocale: string;
// 		locales?: string[];
// 	};
// }

// type LayoutParams = {
// 	locale?: string;
// };

type RootLayoutProps = {
	children: React.ReactNode;
	// params?: Promise<LayoutParams>;
};

export default async function RootLayout({ children }: RootLayoutProps) {
	// همیشه یا await promise یا مقدار خالی
	// const resolvedParams = (await params) ?? {};
	// const locale = resolvedParams.locale ?? "fa";
	// const isRTL = locale === "fa";
	// const dir = isRTL ? "rtl" : ("ltr" as const);

	// const configModule: NextI18NextConfig = await import("../../next-i18next.config.cjs");
	// const defaultLocale = configModule.i18n?.defaultLocale ?? "fa";

	// await i18nInstance
	// 	// .use(initReactI18next)
	// 	.use(resourcesToBackend((lng: string, ns: string) => import(`../../public/locales/${lng}/${ns}.json`)))
	// 	.init({
	// 		lng: locale,
	// 		ns: ["common"],
	// 		fallbackLng: defaultLocale,
	// 		interpolation: { escapeValue: false },
	// 	});

	// const resources: Resource = i18nInstance.services.resourceStore.data;
	// const resources = i18nInstance.services.resourceStore.data;

	return (
		<html className="min-h-dvh">
			<body className={`${inter.className} min-h-dvh`}>
				{/* <ClientDirProvider dir={dir}> */}
				{/* <ClientI18nProvider initialResources={resources} lng={locale} defaultLocale={defaultLocale}> */}
				{children}
				{/* </ClientI18nProvider> */}
				{/* </ClientDirProvider> */}

				<Suspense>
					<DraftModeNotification />
				</Suspense>
			</body>
		</html>
	);
}
