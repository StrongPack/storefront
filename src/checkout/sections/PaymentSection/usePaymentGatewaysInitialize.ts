import { useEffect, useMemo, useRef, useState } from "react";
import { type CountryCode, usePaymentGatewaysInitializeMutation } from "@/checkout/graphql";
import { useCheckout } from "@/checkout/hooks/useCheckout";
import { useSubmit } from "@/checkout/hooks/useSubmit";
import { type MightNotExist } from "@/checkout/lib/globalTypes";
import { type ParsedPaymentGateways } from "@/checkout/sections/PaymentSection/types";
import { getFilteredPaymentGateways } from "@/checkout/sections/PaymentSection/utils";
import { type LanguageCodeEnum } from "@/gql/graphql";
export const usePaymentGatewaysInitialize = ({ languageCode }: { languageCode: LanguageCodeEnum }) => {
	const {
		checkout: { billingAddress },
	} = useCheckout({ languageCode });
	const {
		checkout: { id: checkoutId, availablePaymentGateways },
	} = useCheckout({ languageCode });

	// console.log("[PaymentGateways] Initial state:", {
	// 	checkoutId,
	// 	hasAvailableGateways: availablePaymentGateways?.length > 0,
	// 	availableGatewayIds: availablePaymentGateways?.map((g) => g.id),
	// 	billingAddress,
	// });

	const billingCountry = billingAddress?.country.code as MightNotExist<CountryCode>;

	const [gatewayConfigs, setGatewayConfigs] = useState<ParsedPaymentGateways>([]);
	const previousBillingCountry = useRef(billingCountry);

	const [{ fetching }, paymentGatewaysInitialize] = usePaymentGatewaysInitializeMutation();

	const onSubmit = useSubmit<{}, typeof paymentGatewaysInitialize>(
		useMemo(
			() => ({
				languageCode,
				hideAlerts: true,
				scope: "paymentGatewaysInitialize",
				shouldAbort: () => !availablePaymentGateways.length,
				// shouldAbort: () => false, // فقط برای دیباگ موقت
				// shouldAbort: () => {
				// 	const abort = !availablePaymentGateways.length;
				// 	console.log("[PaymentGateways] shouldAbort", abort, availablePaymentGateways);
				// 	return abort;
				// },
				onSubmit: paymentGatewaysInitialize,
				parse: () => {
					// // console.log("[PaymentGateways] Raw gateways:", availablePaymentGateways);
					// const filteredGateways = getFilteredPaymentGateways(availablePaymentGateways);
					// // console.log("[PaymentGateways] Filtered gateways:", filteredGateways);

					// const mappedGateways = filteredGateways.map(({ config, id }) => {
					// 	// console.log("[PaymentGateways] Gateway details:", { id, config });
					// 	return {
					// 		id,
					// 		data: config,
					// 	};
					// });

					// return {
					// 	checkoutId,
					// 	paymentGateways: mappedGateways,
					// };

					return {
						checkoutId,
						paymentGateways: getFilteredPaymentGateways(availablePaymentGateways).map(({ config, id }) => ({
							id,
							data: config,
						})),
					};
				},
				onSuccess: ({ data }) => {
					const parsedConfigs = (data.gatewayConfigs || []) as ParsedPaymentGateways;
					// console.log(parsedConfigs);
					if (!parsedConfigs.length) {
						throw new Error("No available payment gateways");
					}

					setGatewayConfigs(parsedConfigs);
				},
				onError: ({ errors }) => {
					console.log({ errors });
				},
			}),
			[availablePaymentGateways, checkoutId, paymentGatewaysInitialize, languageCode],
		),
	);

	useEffect(() => {
		void onSubmit();
	}, [onSubmit]);

	useEffect(() => {
		if (billingCountry !== previousBillingCountry.current) {
			previousBillingCountry.current = billingCountry;
			void onSubmit();
		}
	}, [billingCountry, onSubmit]);

	return {
		fetching,
		availablePaymentGateways: gatewayConfigs || [],
	};
};
