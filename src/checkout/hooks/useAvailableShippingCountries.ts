import { useMemo } from "react";
import { type CountryCode, useChannelQuery } from "@/checkout/graphql";
import { useCheckout } from "@/checkout/hooks/useCheckout";
import { type LanguageCodeEnum } from "@/gql/graphql";

interface UseAvailableShippingCountries {
	availableShippingCountries: CountryCode[];
}

export const useAvailableShippingCountries = (
	languageCode: LanguageCodeEnum,
): UseAvailableShippingCountries => {
	const { checkout } = useCheckout({ languageCode });
	const [{ data }] = useChannelQuery({
		variables: { slug: checkout.channel.slug },
		pause: !checkout?.channel.slug,
	});

	const availableShippingCountries: CountryCode[] = useMemo(
		() => (data?.channel?.countries?.map(({ code }) => code) as CountryCode[]) || [],
		[data?.channel?.countries],
	);

	return { availableShippingCountries };
};
