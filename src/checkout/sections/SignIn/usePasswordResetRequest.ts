import { useEffect, useState } from "react";
import { useRequestPasswordResetMutation } from "@/checkout/graphql";
import { useAlerts } from "@/checkout/hooks/useAlerts";
import { useSubmit } from "@/checkout/hooks/useSubmit/useSubmit";
import { getCurrentHref } from "@/checkout/lib/utils/locale";
import { type LanguageCodeEnum } from "@/gql/graphql";

interface PasswordResetFormData {
	email: string;
	languageCode: LanguageCodeEnum;
	shouldAbort: () => Promise<boolean>;
}

export const usePasswordResetRequest = ({ email, languageCode, shouldAbort }: PasswordResetFormData) => {
	const { showSuccess } = useAlerts();

	const [, requestPasswordReset] = useRequestPasswordResetMutation();

	const [passwordResetSent, setPasswordResetSent] = useState(false);

	const onSubmit = useSubmit<{}, typeof requestPasswordReset>({
		languageCode,
		scope: "requestPasswordReset",
		onSubmit: requestPasswordReset,
		shouldAbort,
		onSuccess: () => {
			setPasswordResetSent(true);
			showSuccess(`A magic link has been sent to ${email}`);
		},
		parse: ({ channel }) => ({ email, redirectUrl: getCurrentHref(), channel }),
	});

	useEffect(() => {
		setPasswordResetSent(false);
	}, [email]);

	return {
		onPasswordResetRequest: () => {
			void onSubmit();
		},
		passwordResetSent,
	};
};
