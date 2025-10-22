// Footer.server.tsx
// import { cookies } from "next/headers";

import { FooterClient } from "./Footer.client";
import { executeGraphQL } from "@/lib/graphql";
import { ChannelsListDocument, MenuGetBySlugDocument, LanguageCodeEnum } from "@/gql/graphql";

export const FooterServer = async ({ channel, locale }: { channel: string; locale: string }) => {
	const footerLinks = await executeGraphQL(MenuGetBySlugDocument, {
		variables: { slug: "footer", channel, languageCode: LanguageCodeEnum.FaIr },
		revalidate: 60 * 60 * 24,
	});

	const channels = process.env.SALEOR_APP_TOKEN
		? await executeGraphQL(ChannelsListDocument, {
				withAuth: false,
				headers: {
					Authorization: `Bearer ${process.env.SALEOR_APP_TOKEN}`,
				},
			})
		: null;

	// const cookieStore = await cookies();
	// const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";

	return <FooterClient footerLinks={footerLinks} channels={channels} locale={locale} />;
};
