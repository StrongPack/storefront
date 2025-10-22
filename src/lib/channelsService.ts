// src/lib/channelsService.ts
import { executeGraphQL } from "@/lib/graphql";
import { ChannelsListDocument, LanguageCodeEnum } from "@/gql/graphql";

export type ChannelConfig = {
	locale: string;
	languageCode: LanguageCodeEnum;
	dir: "rtl" | "ltr";
};

export type ChannelConfigMap = Record<string, ChannelConfig>;

let cachedChannels: Awaited<ReturnType<typeof fetchChannels>> | null = null;

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
	if (!cachedChannels) {
		cachedChannels = await fetchChannels();
	}

	// console.log(cachedChannels);
	const map: ChannelConfigMap = {};
	for (const ch of cachedChannels) {
		map[ch.slug] = {
			locale: ch.slug === "default-channel" ? "fa" : "en",
			languageCode: ch.slug === "default-channel" ? LanguageCodeEnum.FaIr : LanguageCodeEnum.EnUs,
			dir: ch.slug === "default-channel" ? "rtl" : "ltr",
		};
	}

	// console.log(map);
	return map;
}
