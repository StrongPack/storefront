import { Suspense } from "react";
import { Checkout, CheckoutSkeleton } from "@/checkout/views/Checkout";
import { OrderConfirmation, OrderConfirmationSkeleton } from "@/checkout/views/OrderConfirmation";
import { getQueryParams } from "@/checkout/lib/utils/url";
import { PaymentProcessingScreen } from "@/checkout/sections/PaymentSection/PaymentProcessingScreen";
import { type LanguageCodeEnum } from "@/gql/graphql";
export const RootViews = ({ locale, languageCode }: { locale: string; languageCode: LanguageCodeEnum }) => {
	const orderId = getQueryParams().orderId;

	if (orderId) {
		return (
			<Suspense fallback={<OrderConfirmationSkeleton />}>
				<OrderConfirmation locale={locale} languageCode={languageCode} />
			</Suspense>
		);
	}

	return (
		<PaymentProcessingScreen>
			<Suspense fallback={<CheckoutSkeleton />}>
				<Checkout locale={locale} languageCode={languageCode} />
			</Suspense>
		</PaymentProcessingScreen>
	);
};
