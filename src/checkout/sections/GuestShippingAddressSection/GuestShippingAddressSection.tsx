import React from "react";
import { useTranslations } from "next-intl";
import { AddressForm } from "@/checkout/components/AddressForm";
import { FormProvider } from "@/checkout/hooks/useForm/FormProvider";
import { useAvailableShippingCountries } from "@/checkout/hooks/useAvailableShippingCountries";
import { useGuestShippingAddressForm } from "@/checkout/sections/GuestShippingAddressSection/useGuestShippingAddressForm";
import { type LanguageCodeEnum } from "@/gql/graphql";
export const GuestShippingAddressSection = ({ languageCode }: { languageCode: LanguageCodeEnum }) => {
	const t = useTranslations("auth");
	const { availableShippingCountries } = useAvailableShippingCountries(languageCode);

	const form = useGuestShippingAddressForm({ languageCode });

	const { handleChange, handleBlur } = form;

	return (
		<FormProvider form={form}>
			<AddressForm
				title={t("shippingAddress")}
				availableCountries={availableShippingCountries}
				fieldProps={{
					onChange: handleChange,
					onBlur: handleBlur,
				}}
			/>
		</FormProvider>
	);
};
