import React, { Suspense } from "react";
import { useTranslations } from "next-intl";
import { AddressForm } from "@/checkout/components/AddressForm";
import { FormProvider } from "@/checkout/hooks/useForm/FormProvider";
import { useGuestBillingAddressForm } from "@/checkout/sections/GuestBillingAddressSection/useGuestBillingAddressForm";
import { useCheckout } from "@/checkout/hooks/useCheckout";
import { AddressSectionSkeleton } from "@/checkout/components/AddressSectionSkeleton";
import { useBillingSameAsShippingForm } from "@/checkout/sections/GuestBillingAddressSection/useBillingSameAsShippingForm";
import { Checkbox } from "@/checkout/components";
import { type LanguageCodeEnum } from "@/gql/graphql";
export const GuestBillingAddressSection = ({ languageCode }: { languageCode: LanguageCodeEnum }) => {
	const t = useTranslations("auth");
	const {
		checkout: { isShippingRequired },
	} = useCheckout({ languageCode });

	const billingSameAsShippingForm = useBillingSameAsShippingForm({ autoSave: true, languageCode });

	const {
		values: { billingSameAsShipping },
	} = billingSameAsShippingForm;

	// we want to avoid validating this form on "pay" click when it's not visible
	const form = useGuestBillingAddressForm({ skipValidation: billingSameAsShipping, languageCode });

	const { handleBlur, handleChange } = form;

	return (
		<Suspense fallback={<AddressSectionSkeleton />}>
			{isShippingRequired && (
				<div className="mb-4">
					<FormProvider form={billingSameAsShippingForm}>
						<Checkbox
							name="billingSameAsShipping"
							label={t("useShippingAsBilling")}
							data-testid="useShippingAsBillingCheckbox"
						/>
					</FormProvider>
				</div>
			)}
			{!billingSameAsShipping && (
				<div className="mb-4">
					<FormProvider form={form}>
						<AddressForm
							title={t("billingAddress")}
							fieldProps={{
								onChange: handleChange,
								onBlur: handleBlur,
							}}
						/>
					</FormProvider>
				</div>
			)}
		</Suspense>
	);
};
