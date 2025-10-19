"use client";

import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { deleteLineFromCheckout } from "./actions";

type Props = {
	lineId: string;
	checkoutId: string;
};

export const DeleteLineButton = ({ lineId, checkoutId }: Props) => {
	const [isPending, startTransition] = useTransition();
	const t = useTranslations("common");

	return (
		<button
			type="button"
			className="text-sm text-neutral-500 hover:text-neutral-900"
			onClick={() => {
				if (isPending) return;
				startTransition(() => deleteLineFromCheckout({ lineId, checkoutId }));
			}}
			aria-disabled={isPending}
		>
			{isPending ? t("cart_removing") : t("cart_remove")}
			<span className="sr-only">{t("cart_remove_line_sr")}</span>
		</button>
	);
};
