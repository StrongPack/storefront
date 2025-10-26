import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import { getChannelConfig } from "@/lib/channelConfig";

export default async function NotFound() {
	const cookieStore = await cookies();
	// const locale = cookieStore.get("locale")?.value || "en";
	const channel = cookieStore.get("channel")?.value || "default-channel";
	const { locale } = await getChannelConfig(channel);

	const t = await getTranslations({ locale, namespace: "common" });
	return (
		<div className="mx-auto max-w-7xl px-8 py-16">
			<div className="mx-auto max-w-3xl text-center">
				<h2 className="font-bold text-blue-600">{t("not_found_code")}</h2>
				<p className="text-2xl font-semibold tracking-tight text-neutral-900">{t("product_not_found")}</p>
			</div>
		</div>
	);
}
