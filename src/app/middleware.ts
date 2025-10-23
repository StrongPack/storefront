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

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
	// 1️⃣ اجرای middleware اصلی next-intl (برای locale)
	const response = intlMiddleware(request);

	// 2️⃣ بررسی کوکی channel
	const channel = request.cookies.get("channel")?.value;

	// اگر کانال وجود نداشت، یک کانال پیش‌فرض ست کن
	if (!channel) {
		response.cookies.set("channel", "default-channel", {
			path: "/",
			maxAge: 60 * 60 * 24 * 7, // ۱ هفته
		});
	}

	// 3️⃣ بازگرداندن response ترکیبی
	return response;
}

// 4️⃣ مسیرهای قابل‌اعمال شدن
export const config = {
	matcher: [
		"/((?!api|graphql|trpc|_next|_vercel|.*\\..*).*)", // تمام مسیرهای فرانت‌اند
	],
};
