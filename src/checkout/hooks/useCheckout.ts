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

	// const langSafe = languageCode ?? LanguageCodeEnum.FaIr;

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
		variables: { id, languageCode: languageCode },
		pause: pause,
	});

	useEffect(() => setLoadingCheckout(fetching || stale), [fetching, setLoadingCheckout, stale]);

	// const err = new Error();
	// const stackLines = (err.stack || "")
	// 	.split("\n")
	// 	.filter((l) => !l.includes("node_modules")) // خطوط داخلی React حذف شود
	// 	.slice(2, 100) // چند خط کافی است
	// 	.map((l) => l.trim());

	// console.groupCollapsed(
	// 	`%c[useCheckout] called — checkout: ${data?.checkout ? "✅ LOADED" : "❌ UNDEFINED"} | fetching: ${
	// 		fetching || stale
	// 	}`,
	// 	"color:#00bfff",
	// );
	// console.log("checkoutId:", id);
	// console.log("languageCode:", languageCode);
	// console.log("stack trace:\n", stackLines.join("\n"));
	// console.groupEnd();

	// console.log({ checkout: data?.checkout as Checkout, fetching: fetching || stale, refetch });

	return useMemo(
		() => ({ checkout: data?.checkout as Checkout, fetching: fetching || stale, refetch }),
		[data?.checkout, fetching, refetch, stale],
	);
};
