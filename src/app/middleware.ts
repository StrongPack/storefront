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

// import createMiddleware from "next-intl/middleware";
// import { routing } from "../i18n/routing";

// export default createMiddleware(routing);

// export const config = {
// 	matcher: ["/((?!api|graphql|trpc|_next|_vercel|.*\\..*).*)"],
// };

// src/middleware.ts
import createMiddleware from "next-intl/middleware";
// import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "../i18n/routing";
import { getChannelConfig } from "@/lib/channelConfig";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
	const response = intlMiddleware(request);

	const existingChannel = request.cookies.get("channel")?.value;

	const currentChannel = existingChannel || "default-channel"; // مقدار پیش‌فرض
	const { locale } = await getChannelConfig(currentChannel);

	if (!existingChannel) {
		response.cookies.set("channel", currentChannel, {
			path: "/",
			maxAge: 60 * 60 * 24 * 7, // یک هفته
		});
	}

	if (!request.cookies.get("locale")) {
		response.cookies.set("locale", locale, {
			path: "/",
			maxAge: 60 * 60 * 24 * 7,
		});
	}

	return response;
}

export const config = {
	matcher: [
		"/((?!api|graphql|trpc|_next|_vercel|.*\\..*).*)", // تمام مسیرهای فرانت‌اند
	],
};
