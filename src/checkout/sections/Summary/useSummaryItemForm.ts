import {
	type CheckoutLineFragment,
	useCheckoutLineDeleteMutation,
	useCheckoutLinesUpdateMutation,
} from "@/checkout/graphql";
import { useForm } from "@/checkout/hooks/useForm";
import { useFormSubmit } from "@/checkout/hooks/useFormSubmit";
import { useSubmit } from "@/checkout/hooks/useSubmit/useSubmit";
import { type LanguageCodeEnum } from "@/gql/graphql";

export interface SummaryItemFormProps {
	line: CheckoutLineFragment;
	languageCode: LanguageCodeEnum;
}

export interface SummaryLineFormData {
	quantity: string;
}

export const useSummaryItemForm = ({ line, languageCode }: SummaryItemFormProps) => {
	const [, updateLines] = useCheckoutLinesUpdateMutation();
	const [, deleteLines] = useCheckoutLineDeleteMutation();

	const onSubmit = useFormSubmit<SummaryLineFormData, typeof updateLines>({
		scope: "checkoutLinesUpdate",
		onSubmit: updateLines,
		parse: ({ quantity, languageCode, checkoutId }) => ({
			languageCode,
			checkoutId,
			lines: [
				{
					quantity: Number(quantity),
					variantId: line.variant.id,
				},
			],
		}),
		onError: ({ formData: { quantity }, formHelpers: { setFieldValue } }) => {
			return setFieldValue("quantity", quantity);
		},
	});

	const form = useForm<SummaryLineFormData>({
		onSubmit,
		initialValues: { quantity: line.quantity.toString() },
	});

	const onLineDelete = useSubmit<{}, typeof deleteLines>({
		languageCode,
		scope: "checkoutLinesDelete",
		onSubmit: deleteLines,
		parse: ({ languageCode, checkoutId }) => ({ languageCode, checkoutId, lineId: line.id }),
	});

	return { form, onLineDelete };
};
