import { getChannelConfigMap } from "./channelsService";

export async function getChannelConfig(slug: string) {
	const map = await getChannelConfigMap();
	return map[slug] ?? map["default-channel"];
}
