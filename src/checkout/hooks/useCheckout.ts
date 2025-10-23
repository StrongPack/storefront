import { useEffect, useMemo } from "react";

import { type Checkout, useCheckoutQuery } from "@/checkout/graphql";
import { extractCheckoutIdFromUrl } from "@/checkout/lib/utils/url";
import { useCheckoutUpdateStateActions } from "@/checkout/state/updateStateStore";
import { type LanguageCodeEnum } from "@/gql/graphql";
interface UseCheckoutProps {
	pause?: boolean;
	languageCode: LanguageCodeEnum;
}

export const useCheckout = ({ pause = false, languageCode }: UseCheckoutProps) => {
	const id = useMemo(() => extractCheckoutIdFromUrl(), []);
	const { setLoadingCheckout } = useCheckoutUpdateStateActions();

	// // شناسایی فایل فراخوانی (stack trace)
	// const err = new Error();
	// const stack = err.stack
	// 	?.split("\n")
	// 	.slice(2, 5) // فقط چند خط کافی است (برای خوانایی)
	// 	.map((line) => line.trim());

	// if (languageCode == null) {
	// 	// console.groupCollapsed(`[useCheckout] Debug`);
	// 	console.log("called from:", stack);
	// 	console.log("id:", id);
	// 	console.log("languageCode:", languageCode);
	// 	// console.groupEnd();
	// 	// console.log(id, languageCode);
	// }

	const [{ data, fetching, stale }, refetch] = useCheckoutQuery({
		variables: { id, languageCode },
		pause: pause,
	});

	useEffect(() => setLoadingCheckout(fetching || stale), [fetching, setLoadingCheckout, stale]);

	return useMemo(
		() => ({ checkout: data?.checkout as Checkout, fetching: fetching || stale, refetch }),
		[data?.checkout, fetching, refetch, stale],
	);
};
