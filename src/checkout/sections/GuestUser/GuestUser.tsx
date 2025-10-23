import { useTranslations } from "next-intl";
import { SignInFormContainer, type SignInFormContainerProps } from "../Contact/SignInFormContainer";
import { PasswordInput } from "@/checkout/components/PasswordInput";
import { Checkbox } from "@/checkout/components/Checkbox";
import { TextInput } from "@/checkout/components/TextInput";
import { useGuestUserForm } from "@/checkout/sections/GuestUser/useGuestUserForm";
import { FormProvider } from "@/checkout/hooks/useForm/FormProvider";
import { type LanguageCodeEnum } from "@/gql/graphql";
type GuestUserProps = Pick<SignInFormContainerProps, "onSectionChange"> & {
	onEmailChange: (email: string) => void;
	email: string;
	languageCode: LanguageCodeEnum;
};

export const GuestUser: React.FC<GuestUserProps> = ({
	onSectionChange,
	onEmailChange,
	email: initialEmail,
	languageCode,
}) => {
	const form = useGuestUserForm({ initialEmail, languageCode });
	const { handleChange } = form;
	const { createAccount } = form.values;

	const t = useTranslations("auth");

	return (
		<SignInFormContainer
			title={t("contactDetails")}
			redirectSubtitle={t("alreadyHaveAccount")}
			redirectButtonLabel={t("signIn")}
			onSectionChange={onSectionChange}
		>
			<FormProvider form={form}>
				<div className="grid grid-cols-1 gap-3">
					<TextInput
						required
						name="email"
						label={t("email_label")}
						onChange={(event) => {
							handleChange(event);
							onEmailChange(event.currentTarget.value);
						}}
					/>
					<Checkbox name="createAccount" label={t("createAccount")} data-testid={"createAccountCheckbox"} />
					{createAccount && (
						<div className="mt-2">
							<PasswordInput name="password" label={t("passwordMinChars")} required />
						</div>
					)}
				</div>
			</FormProvider>
		</SignInFormContainer>
	);
};
