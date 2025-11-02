// lib/getInitialLocaleServer.ts
import { cookies } from "next/headers";
import { getChannelConfig } from "@/lib/channelConfig";

export async function getInitialLocaleServer() {
	const cookieStore = await cookies();
	const channel = cookieStore.get("channel")?.value ?? "default-channel";

	const { languageCode, locale, dir } = await getChannelConfig(channel);
	return { channel, languageCode, locale, dir };
}
