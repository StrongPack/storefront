"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	useEffect(() => {
		console.error(error);
	}, [error]);
	const t = useTranslations("common");
	return (
		<div className="bg-white">
			<div className="mx-auto max-w-7xl px-6 py-12">
				<h1 className="text-2xl font-bold leading-10 tracking-tight text-neutral-800">{t("site_name")}</h1>
				<p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600">
					<code>{error.message}</code>
				</p>
				<button
					className="mt-8 h-10 rounded-md bg-red-500 px-6 font-semibold text-white"
					onClick={() => reset()}
				>
					{t("site_name")}
				</button>
			</div>
		</div>
	);
}
