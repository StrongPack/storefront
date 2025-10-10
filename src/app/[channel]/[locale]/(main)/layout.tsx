// import { type ReactNode } from "react";
// import { getLocale } from "next-intl/server";
import { Footer } from "@/ui/components/Footer";
import { Header } from "@/ui/components/Header";

export const metadata = {
	title: "20pack",
	description: "Starter pack for building performant e-commerce experiences with Saleor.",
};

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ channel: string; locale: string }>;
}) {
	const { channel, locale } = await params; // ✅
	// console.log("locale from params:", locale);

	// export default async function RootLayout(props: {
	// 	children: ReactNode;
	// 	params: Promise<{ channel: string; locale: string }>;
	// }) {
	// 	const channel = (await props.params).channel;
	// 	const locale = await getLocale();

	return (
		<>
			<Header channel={channel} locale={locale} />
			<div className="flex min-h-[calc(100dvh-64px)] flex-col">
				<main className="flex-1">{children}</main>
				<Footer channel={channel} locale={locale} />
			</div>
		</>
	);
}
