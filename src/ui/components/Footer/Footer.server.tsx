// Footer.server.tsx
import { FooterClient } from "./Footer.client";
import { executeGraphQL } from "@/lib/graphql";
import { ChannelsListDocument, MenuGetBySlugDocument } from "@/gql/graphql";

export const FooterServer = async ({ channel }: { channel: string }) => {
	const footerLinks = await executeGraphQL(MenuGetBySlugDocument, {
		variables: { slug: "footer", channel },
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

	return <FooterClient footerLinks={footerLinks} channels={channels} />;
};
