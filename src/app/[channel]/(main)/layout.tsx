// import { type ReactNode } from "react";
// import { getLocale } from "next-intl/server";
import { Footer } from "@/ui/components/Footer";
import { Header } from "@/ui/components/Header";
import { WhyUs } from "@/ui/components/WhyUs";
// import { OurCustomers } from "@/ui/components/OurCustomers";
import { getChannelConfig } from "@/lib/channelConfig";

export const metadata = {
	title: "20pack",
	description: "20pack.",
};

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ channel: string }>;
}) {
	const { channel } = await params;
	const { languageCode, locale, dir } = await getChannelConfig(channel);
	// console.log("locale from params:", locale);

	// export default async function RootLayout(props: {
	// 	children: ReactNode;
	// 	params: Promise<{ channel: string; locale: string }>;
	// }) {
	// 	const channel = (await props.params).channel;
	// 	const locale = await getLocale();

	return (
		<>
			{/* <Header channel={channel} locale={locale} languageCode={languageCode} />
			<div className="flex min-h-[calc(100dvh-64px)] flex-col">
				<main className="flex-1">{children}</main>
				<WhyUs dir={dir} />
				<Footer channel={channel} languageCode={languageCode} />
			</div> */}

			{/* 🟩 Fixed Header */}
			<div className="fixed left-0 right-0 top-0 z-50 bg-white shadow-md">
				<Header channel={channel} locale={locale} languageCode={languageCode} />
			</div>

			{/* 🟦 صفحه اصلی با فاصله بالا برای هدر */}
			<div className="flex min-h-[calc(100dvh-64px)] flex-col pt-[80px]">
				<main className="flex-1">{children}</main>
				<WhyUs dir={dir} />
				<Footer channel={channel} languageCode={languageCode} />
			</div>
		</>
	);
}
