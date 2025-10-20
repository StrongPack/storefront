import { useTranslations } from "next-intl";
import { SignInFormContainer, type SignInFormContainerProps } from "../Contact/SignInFormContainer";
import { PasswordInput } from "@/checkout/components/PasswordInput";
import { Checkbox } from "@/checkout/components/Checkbox";
import { TextInput } from "@/checkout/components/TextInput";
import { useGuestUserForm } from "@/checkout/sections/GuestUser/useGuestUserForm";
import { FormProvider } from "@/checkout/hooks/useForm/FormProvider";

type GuestUserProps = Pick<SignInFormContainerProps, "onSectionChange"> & {
	onEmailChange: (email: string) => void;
	email: string;
};

export const GuestUser: React.FC<GuestUserProps> = ({
	onSectionChange,
	onEmailChange,
	email: initialEmail,
}) => {
	const form = useGuestUserForm({ initialEmail });
	const { handleChange } = form;
	const { createAccount } = form.values;

	const t = useTranslations("auth");
	//   return <h2>{t("contactDetails")}</h2>;

	return (
		<SignInFormContainer
			title="Contact details"
			redirectSubtitle={t("alreadyHaveAccount")}
			redirectButtonLabel={t("signIn")}
			onSectionChange={onSectionChange}
		>
			<FormProvider form={form}>
				<div className="grid grid-cols-1 gap-3">
					<TextInput
						required
						name="email"
						label="Email"
						onChange={(event) => {
							handleChange(event);
							onEmailChange(event.currentTarget.value);
						}}
					/>
					<Checkbox
						name="createAccount"
						label="I want to create account"
						data-testid={"createAccountCheckbox"}
					/>
					{createAccount && (
						<div className="mt-2">
							<PasswordInput name="password" label="Password (minimum 8 characters)" required />
						</div>
					)}
				</div>
			</FormProvider>
		</SignInFormContainer>
	);
};
