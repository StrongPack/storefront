import React from "react";
import { useTranslations } from "next-intl";
import { Select } from "@/checkout/components/Select";
import { type CountryCode } from "@/checkout/graphql";
import { countries as allCountries } from "@/checkout/lib/consts/countries";
import { getCountryName } from "@/checkout/lib/utils/locale";

interface CountrySelectProps {
	only?: CountryCode[];
}

export const CountrySelect: React.FC<CountrySelectProps> = ({ only = [] }) => {
	const t = useTranslations("ui");
	const countriesToMap = only.length ? only : allCountries;

	const countryOptions = countriesToMap.map((countryCode) => ({
		value: countryCode,
		label: getCountryName(countryCode),
	}));

	return (
		<Select name="countryCode" label={t("country")} options={countryOptions} autoComplete="countryCode" />
	);
};
