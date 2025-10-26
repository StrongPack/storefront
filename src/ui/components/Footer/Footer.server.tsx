// Footer.server.tsx
// import { cookies } from "next/headers";

import { FooterClient } from "./Footer.client";
import { executeGraphQL } from "@/lib/graphql";
import { MenuGetBySlugDocument, type LanguageCodeEnum } from "@/gql/graphql";
import { getChannelConfig, getAllChannelConfigs } from "@/lib/channelConfig";

export const FooterServer = async ({
	channel,
	languageCode,
}: {
	channel: string;
	languageCode: LanguageCodeEnum;
}) => {
	const footerLinks = await executeGraphQL(MenuGetBySlugDocument, {
		variables: { slug: "footer", channel, languageCode: languageCode },
		revalidate: 60 * 60 * 24,
	});

	// const channels = process.env.SALEOR_APP_TOKEN
	// 	? await executeGraphQL(ChannelsListDocument, {
	// 			withAuth: false,
	// 			headers: {
	// 				Authorization: `Bearer ${process.env.SALEOR_APP_TOKEN}`,
	// 			},
	// 		})
	// 	: null;

	const channelMap = await getAllChannelConfigs();

	// ۲️⃣ تبدیل map به آرایه برای props
	const channels = Object.entries(channelMap).map(([slug, cfg]) => ({
		id: cfg.id,
		slug,
		name: cfg.name,
		flag: cfg.flag,
		locale: cfg.locale,
		dir: cfg.dir,
		languageCode: cfg.languageCode,
		displayname: cfg.displayName,
	}));

	const { dir, locale } = await getChannelConfig(channel);

	// const cookieStore = await cookies();
	// const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";

	return <FooterClient footerLinks={footerLinks} channels={channels} dir={dir} locale={locale} />;
};
