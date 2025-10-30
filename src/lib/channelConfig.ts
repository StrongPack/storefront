import { getChannelConfigMap } from "./channelsService";
import { LanguageCodeEnum } from "@/gql/graphql";

export async function getChannelConfig(slug: string) {
	const map = await getChannelConfigMap();
	// console.log(map);
	// اگر map خالی بود یا کانال خواسته‌شده پیدا نشد، fallback بده
	const fallback = {
		id: "Q2hhbm5lbDoz",
		name: "Persian",
		locale: "fa",
		languageCode: LanguageCodeEnum.FaIr,
		dir: "rtl",
		flag: "🇮🇷",
		displayName: "فارسی",
	};

	return map?.[slug] ?? map?.["default-channel"] ?? fallback;
}

export async function getAllChannelConfigs() {
	const map = await getChannelConfigMap();
	return map;
}
