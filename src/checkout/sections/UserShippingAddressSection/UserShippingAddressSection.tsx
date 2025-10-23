import React, { Suspense } from "react";
import { useTranslations } from "next-intl";
import { getById } from "@/checkout/lib/utils/common";
import { AddressSectionSkeleton } from "@/checkout/components/AddressSectionSkeleton";
import { UserAddressSectionContainer } from "@/checkout/sections/UserAddressSectionContainer";
import { useUserShippingAddressForm } from "@/checkout/sections/UserShippingAddressSection/useUserShippingAddressForm";
import { AddressCreateForm } from "@/checkout/sections/AddressCreateForm";
import { AddressEditForm } from "@/checkout/sections/AddressEditForm";
import { AddressList } from "@/checkout/sections/AddressList/AddressList";
import { type AddressFragment } from "@/checkout/graphql";
import { useCheckoutFormValidationTrigger } from "@/checkout/hooks/useCheckoutFormValidationTrigger";
import { useAvailableShippingCountries } from "@/checkout/hooks/useAvailableShippingCountries";
import { type LanguageCodeEnum } from "@/gql/graphql";
interface UserShippingAddressSectionProps {
	languageCode: LanguageCodeEnum;
}

export const UserShippingAddressSection: React.FC<UserShippingAddressSectionProps> = ({ languageCode }) => {
	const t = useTranslations("auth");
	const { availableShippingCountries } = useAvailableShippingCountries(languageCode);
	const {
		form,
		userAddressActions: { onAddressCreateSuccess, onAddressDeleteSuccess, onAddressUpdateSuccess },
	} = useUserShippingAddressForm({ languageCode });

	useCheckoutFormValidationTrigger({
		scope: "shippingAddress",
		form: form,
	});

	return (
		<Suspense fallback={<AddressSectionSkeleton />}>
			<UserAddressSectionContainer>
				{({
					displayAddressCreate,
					displayAddressEdit,
					displayAddressList,
					setDisplayAddressCreate,
					setDisplayAddressEdit,
					editedAddressId,
				}) => (
					<>
						{displayAddressCreate && (
							<AddressCreateForm
								availableCountries={availableShippingCountries}
								onClose={() => setDisplayAddressCreate(false)}
								onSuccess={onAddressCreateSuccess}
							/>
						)}

						{displayAddressEdit && (
							<AddressEditForm
								availableCountries={availableShippingCountries}
								title={t("shippingAddress")}
								onClose={() => setDisplayAddressEdit()}
								address={form.values.addressList.find(getById(editedAddressId)) as AddressFragment}
								onUpdate={onAddressUpdateSuccess}
								onDelete={onAddressDeleteSuccess}
								languageCode={languageCode}
							/>
						)}

						{displayAddressList && (
							<AddressList
								onEditChange={setDisplayAddressEdit}
								onAddAddressClick={() => setDisplayAddressCreate(true)}
								title={t("shippingAddress")}
								checkAddressAvailability={true}
								form={form}
								languageCode={languageCode}
							/>
						)}
					</>
				)}
			</UserAddressSectionContainer>
		</Suspense>
	);
};
