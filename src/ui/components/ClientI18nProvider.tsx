"use client";

import { type ReactNode, useEffect } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { createInstance, type Resource } from "i18next";

import resourcesToBackend from "i18next-resources-to-backend";
// import i18nextConfig from "../../../next-i18next.config"; // default import, adjust path if needed

interface ClientI18nProviderProps {
	children: ReactNode;
	initialResources?: Resource;
	lng: string;
	defaultLocale: string;
}

export function ClientI18nProvider({
	children,
	initialResources,
	lng,
	defaultLocale,
}: ClientI18nProviderProps) {
	const i18nInstance = createInstance();

	// i18nInstance
	// 	.use(initReactI18next)
	// 	.use(
	// 		resourcesToBackend(
	// 			(language: string, namespace: string) =>
	// 				import(`../../../public/locales/${language}/${namespace}.json`),
	// 		),
	// 	)
	// 	.init({
	// 		lng,
	// 		ns: ["common"],
	// 		fallbackLng: defaultLocale,
	// 		interpolation: { escapeValue: false },
	// 		...(initialResources && { resources: initialResources }),
	// 	});

	// return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;

	useEffect(() => {
		// Init i18next instance safely
		void i18nInstance
			.use(initReactI18next)
			.use(
				resourcesToBackend(
					(language: string, namespace: string) =>
						import(`../../../public/locales/${language}/${namespace}.json`),
				),
			)
			.init({
				lng,
				ns: ["common"],
				fallbackLng: defaultLocale,
				interpolation: { escapeValue: false },
				...(initialResources ? { resources: initialResources } : {}),
			});
	}, [lng, defaultLocale, initialResources, i18nInstance]);

	return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
