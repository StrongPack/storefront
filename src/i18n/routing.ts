// import { defineRouting } from "next-intl/routing";

// export const routing = defineRouting({
// 	locales: ["en", "fa"],
// 	defaultLocale: "en",
// });

import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	locales: ["en", "fa"],
	defaultLocale: "fa",
	localePrefix: "as-needed",
	pathnames: {
		// "/[channel]/[locale]": {
		// 	en: "/:channel/en",
		// 	fa: "/:channel/fa",
		// },

		"/[channel]": {
			fa: "/:channel",
			en: "/:channel",
		},
	},
});

// import { createSharedPathnamesNavigation } from 'next-intl/navigation';

// export const locales = ['fa', 'en'] as const;
// export const defaultLocale = 'fa';

// export const { Link, useRouter, usePathname, redirect, permanentRedirect } =
//   createSharedPathnamesNavigation({
// locales,
// localePrefix: 'always'
//   });
