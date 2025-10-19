import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { getMessages } from "@/lib/getMessages";

// type Messages = Record<string, unknown>;

export default getRequestConfig(async ({ requestLocale }) => {
	const requested = await requestLocale;
	const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
	// const messages: Messages = (await import(`@/messages/${locale}/common.json`)).default as Messages;

	// return {
	// 	locale,
	// 	messages,
	// };

	// ← ترفند ایمن: قبل از دسترسی به .default کل import را cast کن
	// const msgsModule = (await import(`@/messages/${locale}/common.json`)) as {
	// 	readonly default: Messages;
	// };

	// return {
	// 	locale,
	// 	messages: msgsModule.default,
	// };

	const messages = await getMessages(locale);

	return {
		locale,
		messages: messages,
	};
});
