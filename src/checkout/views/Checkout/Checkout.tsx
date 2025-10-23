import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { EmptyCartPage } from "../EmptyCartPage";
import { PageNotFound } from "../PageNotFound";
import { useUser } from "../../hooks/useUser";
import { Summary, SummarySkeleton } from "@/checkout/sections/Summary";
import { CheckoutForm, CheckoutFormSkeleton } from "@/checkout/sections/CheckoutForm";
import { useCheckout } from "@/checkout/hooks/useCheckout";
import { CheckoutSkeleton } from "@/checkout/views/Checkout/CheckoutSkeleton";
import { type LanguageCodeEnum } from "@/gql/graphql";
export const Checkout = ({ locale, languageCode }: { locale: string; languageCode: LanguageCodeEnum }) => {
	const { checkout, fetching: fetchingCheckout } = useCheckout({ languageCode });
	const { loading: isAuthenticating } = useUser();

	const isCheckoutInvalid = !fetchingCheckout && !checkout && !isAuthenticating;

	const isInitiallyAuthenticating = isAuthenticating && !checkout;

	const isEmptyCart = checkout && !checkout.lines.length;

	return isCheckoutInvalid ? (
		<PageNotFound />
	) : isInitiallyAuthenticating ? (
		<CheckoutSkeleton />
	) : (
		<ErrorBoundary FallbackComponent={PageNotFound}>
			<div className="page">
				{isEmptyCart ? (
					<EmptyCartPage />
				) : (
					<div className="grid min-h-screen grid-cols-1 gap-x-16 lg:grid-cols-2 lg:grid-rows-1">
						<div className="lg:col-start-1 lg:col-end-1">
							<Suspense fallback={<CheckoutFormSkeleton />}>
								<CheckoutForm locale={locale} languageCode={languageCode} />
							</Suspense>
						</div>
						<div className="lg:col-start-2 lg:col-end-2">
							<Suspense fallback={<SummarySkeleton />}>
								<Summary {...checkout} locale={locale} languageCode={languageCode} />
							</Suspense>
						</div>
					</div>
				)}
			</div>
		</ErrorBoundary>
	);
};
