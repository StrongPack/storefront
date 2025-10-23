import { type OrderFragment, useOrderQuery } from "@/checkout/graphql";
import { getQueryParams } from "@/checkout/lib/utils/url";
import { type LanguageCodeEnum } from "@/gql/graphql";
export const useOrder = (languageCode: LanguageCodeEnum) => {
	const { orderId } = getQueryParams();

	const [{ data, fetching: loading }] = useOrderQuery({
		pause: !orderId,
		variables: { languageCode: languageCode, id: orderId as string },
	});

	return { order: data?.order as OrderFragment, loading };
};
