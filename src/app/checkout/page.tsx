// "use client";

import Link from "next/link";
import { invariant } from "ts-invariant";
import { getTranslations } from "next-intl/server";
import { RootWrapper } from "./pageWrapper";

export const metadata = {
	title: "Checkout · 20pack",
};

export default async function CheckoutPage(props: {
	searchParams: Promise<{ checkout?: string; order?: string }>;
}) {
	const t = await getTranslations("common");
	const searchParams = await props.searchParams;
	invariant(process.env.NEXT_PUBLIC_SALEOR_API_URL, "Missing NEXT_PUBLIC_SALEOR_API_URL env variable");

	if (!searchParams.checkout && !searchParams.order) {
		return null;
	}

	return (
		<div className="min-h-dvh bg-white">
			{/* <section className="mx-auto flex min-h-dvh w-full max-w-7xl flex-col p-8"> */}
			{/* <section className="flex min-h-dvh w-full flex-col p-8"> */}
			<section className="mx-auto flex min-h-dvh max-w-7xl flex-col p-8">
				<div className="flex items-center font-bold">
					<Link aria-label="homepage" href="/">
						{/* {t("site_name")} */}
						{t("site_name")}
					</Link>
				</div>
				<h1 className="mt-8 text-3xl font-bold text-neutral-900">{t("checkout_title")}</h1>

				{/* <section className="mb-12 mt-6 flex-1">
					<RootWrapper saleorApiUrl={process.env.NEXT_PUBLIC_SALEOR_API_URL} />
				</section> */}

				<section className="mb-12 mt-6 flex-1">
					{/* <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-x-12 lg:grid-cols-2 rtl:[direction:rtl] rtl:[grid-auto-flow:dense]"> */}
					{/* <div className="grid w-full grid-cols-1 gap-x-12 lg:grid-cols-2 rtl:[direction:rtl] rtl:[grid-auto-flow:dense]"> */}
					<RootWrapper saleorApiUrl={process.env.NEXT_PUBLIC_SALEOR_API_URL} />
					{/* </div> */}
				</section>
			</section>
		</div>
	);
}
