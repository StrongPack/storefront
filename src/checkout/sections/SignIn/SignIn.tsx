import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/checkout/components/Button";
import { PasswordInput } from "@/checkout/components/PasswordInput";
import { TextInput } from "@/checkout/components/TextInput";
import { useSignInForm } from "@/checkout/sections/SignIn/useSignInForm";
import { usePasswordResetRequest } from "@/checkout/sections/SignIn/usePasswordResetRequest";
import { FormProvider } from "@/checkout/hooks/useForm/FormProvider";
import {
	SignInFormContainer,
	type SignInFormContainerProps,
} from "@/checkout/sections/Contact/SignInFormContainer";
import { isValidEmail } from "@/checkout/lib/utils/common";
import { useErrorMessages } from "@/checkout/hooks/useErrorMessages";
import { useCheckout } from "@/checkout/hooks/useCheckout";

interface SignInProps extends Pick<SignInFormContainerProps, "onSectionChange"> {
	onSignInSuccess: () => void;
	onEmailChange: (email: string) => void;
	email: string;
}

export const SignIn: React.FC<SignInProps> = ({
	onSectionChange,
	onSignInSuccess,
	onEmailChange,
	email: initialEmail,
}) => {
	const t = useTranslations("ui");
	const {
		checkout: { email: checkoutEmail },
	} = useCheckout();
	const { errorMessages } = useErrorMessages();

	const form = useSignInForm({
		onSuccess: onSignInSuccess,
		initialEmail: initialEmail || checkoutEmail || "",
	});

	const {
		values: { email },
		handleChange,
		setErrors,
		setTouched,
		isSubmitting,
	} = form;

	const { onPasswordResetRequest, passwordResetSent } = usePasswordResetRequest({
		email,
		shouldAbort: async () => {
			// @todo we'll use validateField once we fix it because
			// https://github.com/jaredpalmer/formik/issues/1755
			const isValid = await isValidEmail(email);

			if (!isValid) {
				await setTouched({ email: true });
				setErrors({ email: errorMessages.emailInvalid });
				return true;
			}
			setErrors({});

			return false;
		},
	});

	return (
		<SignInFormContainer
			title={t("signIn")}
			redirectSubtitle={t("newCustomer")}
			redirectButtonLabel={t("guestCheckout")}
			onSectionChange={onSectionChange}
		>
			<FormProvider form={form}>
				<div className="grid grid-cols-1 gap-3">
					<TextInput
						required
						name="email"
						label={t("email")}
						onChange={(event) => {
							handleChange(event);
							onEmailChange(event.currentTarget.value);
						}}
					/>
					<PasswordInput name="password" label={t("password")} required />
					<div className="flex w-full flex-row items-center justify-end">
						<Button
							ariaDisabled={isSubmitting}
							ariaLabel={t("forgotPassword")}
							variant="tertiary"
							label={passwordResetSent ? t("resend") : t("forgotPassword")}
							className="ml-1 mr-4"
							onClick={(e) => (isSubmitting ? e.preventDefault() : onPasswordResetRequest)}
						/>
						<Button
							type="submit"
							disabled={isSubmitting}
							ariaLabel={t("signInButton")}
							label={isSubmitting ? t("processing") : t("signInButton")}
						/>
					</div>
				</div>
			</FormProvider>
		</SignInFormContainer>
	);
};
