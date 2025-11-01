import { useEffect } from "react";
import { useCheckout } from "@/checkout/hooks/useCheckout";
import { useCheckoutComplete } from "@/checkout/hooks/useCheckoutComplete";
import { type PaymentStatus } from "@/checkout/sections/PaymentSection/types";
import { usePaymentGatewaysInitialize } from "@/checkout/sections/PaymentSection/usePaymentGatewaysInitialize";
import { usePaymentStatus } from "@/checkout/sections/PaymentSection/utils";
import { type LanguageCodeEnum } from "@/gql/graphql";
const paidStatuses: PaymentStatus[] = ["overpaid", "paidInFull", "authorized"];

export const usePayments = ({ languageCode }: { languageCode: LanguageCodeEnum }) => {
	const { checkout } = useCheckout({ languageCode });
	const paymentStatus = usePaymentStatus(checkout);
	console.log("usePayments");
	const { fetching, availablePaymentGateways } = usePaymentGatewaysInitialize({ languageCode });

	const { onCheckoutComplete, completingCheckout } = useCheckoutComplete(languageCode);

	useEffect(() => {
		// the checkout was already paid earlier, complete
		if (!completingCheckout && paidStatuses.includes(paymentStatus)) {
			void onCheckoutComplete();
		}
	}, [completingCheckout, onCheckoutComplete, paymentStatus]);

	return { fetching, availablePaymentGateways };
};
