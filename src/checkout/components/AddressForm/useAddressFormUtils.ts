import camelCase from "lodash-es/camelCase";
import { useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import {
	type CountryCode,
	useAddressValidationRulesQuery,
	type ValidationRulesFragment,
} from "@/checkout/graphql";
import { type OptionalAddress, type AddressField } from "@/checkout/components/AddressForm/types";
import { defaultCountry } from "@/checkout/lib/consts/countries";
import { getOrderedAddressFields, getRequiredAddressFields } from "@/checkout/components/AddressForm/utils";

export type AddressFieldLabel = Exclude<AddressField, "countryCode"> | "country";
export const addressFieldMessages: Record<AddressFieldLabel, string> = {
	city: "City",
	firstName: "First name",
	countryArea: "Country area",
	lastName: "Last name",
	country: "Country",
	cityArea: "City area",
	postalCode: "Postal code",
	companyName: "Company",
	streetAddress1: "Street address",
	streetAddress2: "Street address (continue)",
	phone: "Phone number",
};

export type LocalizedAddressFieldLabel =
	| "province"
	| "district"
	| "state"
	| "zip"
	| "postal"
	| "postTown"
	| "prefecture";
export const localizedAddressFieldMessages: Record<LocalizedAddressFieldLabel, string> = {
	province: "Province",
	district: "District",
	state: "State",
	zip: "Zip code",
	postal: "Postal code",
	postTown: "Post town",
	prefecture: "Prefecture",
};

export const useAddressFormUtils = (countryCode: CountryCode = defaultCountry) => {
	const t = useTranslations("ui");
	const [{ data }] = useAddressValidationRulesQuery({
		variables: { countryCode },
	});

	const validationRules = data?.addressValidationRules as ValidationRulesFragment;

	const { countryAreaType, postalCodeType, cityType } = validationRules || {};

	const localizedFields = useMemo(
		() => ({
			countryArea: countryAreaType,
			city: cityType,
			postalCode: postalCodeType,
		}),
		[cityType, countryAreaType, postalCodeType],
	);

	const isRequiredField = useCallback(
		(field: AddressField) =>
			getRequiredAddressFields(validationRules?.requiredFields as AddressField[]).includes(field),
		[validationRules?.requiredFields],
	);

	const getMissingFieldsFromAddress = useCallback(
		(address: OptionalAddress) => {
			if (!address) {
				return [];
			}

			return Object.entries(address).reduce((result, [fieldName, fieldValue]) => {
				if (!isRequiredField(fieldName as AddressField)) {
					return result;
				}

				return !!fieldValue ? result : ([...result, fieldName] as AddressField[]);
			}, [] as AddressField[]);
		},
		[isRequiredField],
	);

	const hasAllRequiredFields = useCallback(
		(address: OptionalAddress) => !getMissingFieldsFromAddress(address).length,
		[getMissingFieldsFromAddress],
	);

	const getLocalizedFieldLabel = useCallback(
		(field: AddressField, localizedField?: string) => {
			try {
				const localizedKey = camelCase(localizedField) as LocalizedAddressFieldLabel;
				// Use translations for localized field labels
				return t(localizedKey);
			} catch (e) {
				console.warn(`Missing translation: ${localizedField}`);
				return addressFieldMessages[camelCase(field) as AddressFieldLabel];
			}
		},
		[t],
	);

	const getFieldLabel = useCallback(
		(field: AddressField) => {
			const localizedField = localizedFields[field as keyof typeof localizedFields];

			const isLocalizedField = !!localizedField && localizedField !== field;

			if (isLocalizedField) {
				return getLocalizedFieldLabel(
					field,
					localizedFields[field as keyof typeof localizedFields] as LocalizedAddressFieldLabel,
				);
			}

			// Use translations for field labels
			const fieldKey = field as AddressFieldLabel;
			return t(fieldKey);
		},
		[getLocalizedFieldLabel, localizedFields, t],
	);

	const orderedAddressFields = getOrderedAddressFields(validationRules?.allowedFields as AddressField[]);

	return {
		orderedAddressFields,
		getFieldLabel,
		isRequiredField,
		hasAllRequiredFields,
		getMissingFieldsFromAddress,
		...validationRules,
		allowedFields: validationRules?.allowedFields as AddressField[] | undefined,
	};
};
