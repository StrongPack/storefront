// import createMiddleware from "next-intl/middleware";

// export default createMiddleware({
// 	// زبان پیش‌فرض
// 	defaultLocale: "fa",

// 	// زبان‌های مجاز
// 	locales: ["fa", "en"],

// 	// مسیرهایی که شامل locale هستند
// 	localePrefix: "as-needed",
// });

// export const config = {
// 	// مسیرهایی که middleware باید رصد کند
// 	matcher: ["/((?!api|_next|favicon.ico).*)"],
// };

// import createMiddleware from "next-intl/middleware";
// import { routing } from "../i18n/routing";

// export default createMiddleware(routing);

// export const config = {
// 	matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
// };

// src/app/middleware.ts

import createMiddleware from "next-intl/middleware";
import { routing } from "../i18n/routing";

export default createMiddleware({
	...routing,
	defaultLocale: routing.defaultLocale,
	localeDetection: true,
});

export const config = {
	matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
