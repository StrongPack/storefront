import { useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { type ErrorCode } from "@/checkout/lib/globalTypes";

export const errorMessages = {
	invalid: "Invalid value",
	required: "Required field",
	unique: "Value must be unique",
	emailInvalid: "Email must be a valid email",
	passwordAtLeastCharacters: "Password must be at least 8 characters",
	passwordTooShort: "Provided password is too short. Minimum length is 8 characters",
	passwordTooSimilar: "Provided password is too similar to your previous password",
	passwordTooCommon: "Provided password is too common. Use something more fancy",
	passwordInvalid: "Provided password is invalid",
	quantityGreaterThanLimit: "Chosen quantity is more than limit allowed",
	insufficientStock: "Not enough of chosen item in stock",
	invalidCredentials: "Invalid credentials provided at login",
	missingFields: "Missing fields in address form: ",
	somethingWentWrong: "Sorry, something went wrong. Please try again in a moment",
} satisfies Record<ErrorCode, string>;

export type ErrorMessages = Record<ErrorCode, string>;

export const useErrorMessages = <TKey extends string = ErrorCode>(customMessages?: Record<TKey, string>) => {
	const t = useTranslations("errors");
	const messagesToUse = customMessages || errorMessages;

	const getMessageByErrorCode = useCallback(
		(errorCode: string) => {
			// Prefer i18n value if available; fallback to provided maps
			let i18nMessage: string | undefined;
			try {
				// Will throw in dev if key is missing; we swallow and fallback
				i18nMessage = t(errorCode as any);
			} catch {
				i18nMessage = undefined;
			}
			if (i18nMessage) return i18nMessage;

			const formattedMessage = messagesToUse[errorCode as keyof typeof messagesToUse];
			if (!formattedMessage) {
				console.warn(`Missing translation: ${errorCode}`);
				return "";
			}
			return formattedMessage;
		},
		[messagesToUse, t],
	);

	const translatedErrorMessages = useMemo(
		() =>
			Object.keys(messagesToUse).reduce(
				(result, key) => ({
					...result,
					[key]: getMessageByErrorCode(key as TKey),
				}),
				{} as Record<TKey, string>,
			),
		[getMessageByErrorCode, messagesToUse],
	);

	return {
		errorMessages: translatedErrorMessages,
		getMessageByErrorCode,
	};
};
