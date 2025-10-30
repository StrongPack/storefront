// src/lib/channelsService.ts
import { executeGraphQL } from "@/lib/graphql";
import { ChannelsListDocument, LanguageCodeEnum } from "@/gql/graphql";

let cachedChannels: Awaited<ReturnType<typeof fetchChannels>> | null = null;
let cacheTime = 0;
const CACHE_TTL_MS = 60_000;

export type ChannelConfig = {
	id: string;
	locale: string;
	languageCode: LanguageCodeEnum;
	dir: "rtl" | "ltr";
	name: string;
	flag: string;
	displayName: string;
};

export type ChannelConfigMap = Record<string, ChannelConfig>;

async function fetchChannels() {
	const channelsResult = process.env.SALEOR_APP_TOKEN
		? await executeGraphQL(ChannelsListDocument, {
				withAuth: false,
				headers: {
					Authorization: `Bearer ${process.env.SALEOR_APP_TOKEN}`,
				},
			})
		: { channels: [] };

	return channelsResult.channels ?? [];
}

export async function getChannelConfigMap(): Promise<ChannelConfigMap> {
	const now = Date.now();
	if (!cachedChannels || now - cacheTime > CACHE_TTL_MS) {
		cachedChannels = await fetchChannels();
		cacheTime = now;
	}

	// const map: ChannelConfigMap = {};
	// for (const ch of cachedChannels) {
	// 	map[ch.slug] = {
	// 		locale: ch.slug === "default-channel" ? "fa" : "en",
	// 		languageCode: ch.slug === "default-channel" ? LanguageCodeEnum.FaIr : LanguageCodeEnum.EnUs,
	// 		dir: ch.currencyCode === "USD" || ch.currencyCode === "TRY" ?  "ltr" : "rtl",
	// 		name: ch.name != "" ? ch.name : "",
	// 	};
	// }
	// return map;

	const map: ChannelConfigMap = {};
	for (const ch of cachedChannels) {
		let locale: string;
		let languageCode: LanguageCodeEnum;
		let dir: "rtl" | "ltr";
		let flag: string;
		let displayName: string;

		if (ch.isActive) {
			switch (ch.slug) {
				case "default-channel": // ایران
					locale = "fa";
					languageCode = LanguageCodeEnum.FaIr;
					dir = "rtl";
					flag = "🇮🇷";
					displayName = "فارسی";
					break;
				case "english": // عمومی/انگلیسی
					locale = "en";
					languageCode = LanguageCodeEnum.EnUs;
					dir = "ltr";
					flag = "🇬🇧";
					displayName = "English";
					break;
				case "turkish": // ترکی
					locale = "tr";
					languageCode = LanguageCodeEnum.TrTr;
					dir = "ltr";
					flag = "🇹🇷";
					displayName = "Türkçe";
					break;
				case "arabic": // عربی
					locale = "ar";
					languageCode = LanguageCodeEnum.ArSa;
					dir = "rtl";
					flag = "🇸🇦"; // "🇸🇦" "🇦🇪"
					displayName = "العربية";
					break;
				default:
					locale = "fa";
					languageCode = LanguageCodeEnum.FaIr;
					dir = "rtl";
					flag = "🇮🇷";
					displayName = "فارسی";
			}

			map[ch.slug] = {
				id: ch.id,
				locale,
				languageCode,
				dir,
				name: ch.name,
				flag,
				displayName,
			};
		}
	}
	return map;
}
