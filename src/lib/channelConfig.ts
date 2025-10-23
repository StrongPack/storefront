import { getChannelConfigMap } from "./channelsService";
import { LanguageCodeEnum } from "@/gql/graphql";

export async function getChannelConfig(slug: string) {
	const map = await getChannelConfigMap();

	// اگر map خالی بود یا کانال خواسته‌شده پیدا نشد، fallback بده
	const fallback = {
		locale: "fa",
		languageCode: LanguageCodeEnum.FaIr,
		dir: "rtl" as const,
	};

	return map?.[slug] ?? map?.["default-channel"] ?? fallback;
}
