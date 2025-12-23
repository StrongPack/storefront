import clsx from "clsx";
import { type FC } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/checkout/components/Button";
import { TextInput } from "@/checkout/components/TextInput";
import { useCheckoutAddPromoCodeMutation } from "@/checkout/graphql";
// import { type Classes } from "@/checkout/lib/globalTypes";
import { useFormSubmit } from "@/checkout/hooks/useFormSubmit";
import { FormProvider } from "@/checkout/hooks/useForm/FormProvider";
import { useForm } from "@/checkout/hooks/useForm";
import { type LanguageCodeEnum } from "@/gql/graphql";

interface PromoCodeFormData {
	promoCode: string;
}

export const PromoCodeAdd: FC<{ className?: string; languageCode: LanguageCodeEnum }> = ({
	className,
	languageCode,
}) => {
	// export const PromoCodeAdd: FC<Classes> = ({ className }) => {
	const t = useTranslations("auth");
	const [, checkoutAddPromoCode] = useCheckoutAddPromoCodeMutation();

	const onSubmit = useFormSubmit<PromoCodeFormData, typeof checkoutAddPromoCode>({
		languageCode: languageCode,
		scope: "checkoutAddPromoCode",
		onSubmit: checkoutAddPromoCode,
		parse: ({ promoCode, languageCode, checkoutId }) => ({
			promoCode,
			checkoutId,
			languageCode,
		}),
		onSuccess: ({ formHelpers: { resetForm } }) => resetForm(),
	});

	const form = useForm<PromoCodeFormData>({
		onSubmit,
		initialValues: { promoCode: "" },
	});
	const {
		values: { promoCode },
	} = form;

	const showApplyButton = promoCode.length > 0;

	return (
		<FormProvider form={form}>
			<div className={clsx("relative my-4", className)}>
				<TextInput required={false} name="promoCode" label={t("addGiftOrDiscount")} />
				{showApplyButton && (
					<Button
						className="absolute bottom-2.5 right-3"
						variant="tertiary"
						ariaLabel="apply"
						label={t("apply")}
						type="submit"
					/>
				)}
			</div>
		</FormProvider>
	);
};
