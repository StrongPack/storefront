// "use client";
// import { cookies } from "next/headers";
// import Link from "next/link";
import { invariant } from "ts-invariant";
import { getTranslations } from "next-intl/server";
import { RootWrapper } from "./pageWrapper";
// import { getChannelConfig } from "@/lib/channelConfig";
import { Logo } from "@/ui/components/Logo";
import { getInitialLocaleServer } from "@/lib/getInitialLocaleServer";
export const metadata = {
	title: "20Pack",
};

export default async function CheckoutPage(props: {
	searchParams: Promise<{ checkout?: string; order?: string }>;
}) {
	const { languageCode, locale } = await getInitialLocaleServer();

	const t = await getTranslations({ locale, namespace: "common" });
	const searchParams = await props.searchParams;
	invariant(process.env.NEXT_PUBLIC_SALEOR_API_URL, "Missing NEXT_PUBLIC_SALEOR_API_URL env variable");

	if (!searchParams.checkout && !searchParams.order) {
		return null;
	}

	return (
		<div className="min-h-dvh bg-white">
			<section className="mx-auto flex min-h-dvh max-w-7xl flex-col p-8">
				<div className="flex items-center font-bold">
					{/* <Link aria-label="homepage" href="/">
						{t("site_name")}
					</Link> */}
					<Logo />
				</div>
				<h1 className="mt-8 text-3xl font-bold text-neutral-900">{t("checkout_title")}</h1>

				<section className="mb-12 mt-6 flex-1">
					<RootWrapper
						saleorApiUrl={process.env.NEXT_PUBLIC_SALEOR_API_URL}
						locale={locale}
						languageCode={languageCode}
					/>
				</section>
			</section>
		</div>
	);
}
