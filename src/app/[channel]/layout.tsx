import { type ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { executeGraphQL } from "@/lib/graphql";
import { ChannelsListDocument } from "@/gql/graphql";
import { getChannelConfig } from "@/lib/channelConfig";
// import { redirect } from "next/navigation";
import { getMessages } from "@/lib/getMessages";
import ClientDirProvider from "@/ui/components/ClientDirProvider";
// import { routing } from "@/i18n/routing";

export const generateStaticParams = async () => {
	// the `channels` query is protected
	// you can either hardcode the channels or use an app token to fetch the channel list here

	if (process.env.SALEOR_APP_TOKEN) {
		const channels = await executeGraphQL(ChannelsListDocument, {
			withAuth: false, // disable cookie-based auth for this call
			headers: {
				// and use app token instead
				Authorization: `Bearer ${process.env.SALEOR_APP_TOKEN}`,
			},
		});

		return (
			channels.channels
				?.filter((channel) => channel.isActive)
				.map((channel) => ({ channel: channel.slug })) ?? []
		);
	} else {
		return [{ channel: "default-channel" }];
	}
};

// export default function ChannelLayout({ children }: { children: ReactNode }) {
// 	return children;
// }

export default async function ChannelLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ channel: string }>;
}) {
	const { channel } = await params;

	const { locale, dir } = await getChannelConfig(channel);

	// // ✅ اگر locale معتبر نیست → ریدایرکت به پیش‌فرض
	// if (!routing.locales.includes(locale)) {
	// 	redirect(`/${channel}`);
	// }

	const messages = await getMessages(locale);

	return (
		<ClientDirProvider dir={dir}>
			<NextIntlClientProvider locale={locale} messages={messages}>
				{children}
			</NextIntlClientProvider>
		</ClientDirProvider>
	);
}

// page.tsx
// 	import { redirect } from "next/navigation";

// export default async function ChannelRoot({ params }: { params: Promise<{ channel: string }> }) {
// 	const { channel } = await params;
// 	redirect(`/${channel}`);
// }
