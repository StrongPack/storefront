import { useCallback } from "react";
import { type CountryCode } from "@/checkout/graphql";
import { useAvailableShippingCountries } from "@/checkout/hooks/useAvailableShippingCountries";
import { type LanguageCodeEnum } from "@/gql/graphql";

export const useAddressAvailability = (languageCode: LanguageCodeEnum, skipCheck = false) => {
	const { availableShippingCountries } = useAvailableShippingCountries(languageCode);

	const isAvailable = useCallback(
		({ country }: { country: { code: string } }) => {
			if (skipCheck) {
				return true;
			}

			return availableShippingCountries.includes(country?.code as CountryCode);
		},
		[skipCheck, availableShippingCountries],
	);

	return { isAvailable, availableShippingCountries };
};
