import { Suspense, useState } from "react";
import { useCheckout } from "@/checkout/hooks/useCheckout";
import { Contact } from "@/checkout/sections/Contact";
import { DeliveryMethods } from "@/checkout/sections/DeliveryMethods";
import { ContactSkeleton } from "@/checkout/sections/Contact/ContactSkeleton";
import { DeliveryMethodsSkeleton } from "@/checkout/sections/DeliveryMethods/DeliveryMethodsSkeleton";
import { AddressSectionSkeleton } from "@/checkout/components/AddressSectionSkeleton";
import { getQueryParams } from "@/checkout/lib/utils/url";
import { CollapseSection } from "@/checkout/sections/CheckoutForm/CollapseSection";
import { Divider } from "@/checkout/components";
import { UserShippingAddressSection } from "@/checkout/sections/UserShippingAddressSection";
import { GuestShippingAddressSection } from "@/checkout/sections/GuestShippingAddressSection";
import { UserBillingAddressSection } from "@/checkout/sections/UserBillingAddressSection";
import { PaymentSection, PaymentSectionSkeleton } from "@/checkout/sections/PaymentSection";
import { GuestBillingAddressSection } from "@/checkout/sections/GuestBillingAddressSection";
import { useUser } from "@/checkout/hooks/useUser";
import { type LanguageCodeEnum } from "@/gql/graphql";
export const CheckoutForm = ({
	locale,
	languageCode,
}: {
	locale: string;
	languageCode: LanguageCodeEnum;
}) => {
	const { user } = useUser();
	const { checkout } = useCheckout({ languageCode });
	const { passwordResetToken } = getQueryParams();

	const [showOnlyContact, setShowOnlyContact] = useState(!!passwordResetToken);

	return (
		<div className="flex flex-col">
			<div className="flex w-full flex-col rounded">
				<Suspense fallback={<ContactSkeleton />}>
					<Contact setShowOnlyContact={setShowOnlyContact} languageCode={languageCode} />
				</Suspense>
				<>
					{checkout?.isShippingRequired && (
						<Suspense fallback={<AddressSectionSkeleton />}>
							<CollapseSection collapse={showOnlyContact}>
								<Divider />
								<div className="py-4" data-testid="shippingAddressSection">
									{user ? (
										<UserShippingAddressSection languageCode={languageCode} />
									) : (
										<GuestShippingAddressSection languageCode={languageCode} />
									)}
								</div>
								{user ? (
									<UserBillingAddressSection languageCode={languageCode} />
								) : (
									<GuestBillingAddressSection languageCode={languageCode} />
								)}
							</CollapseSection>
						</Suspense>
					)}
					<Suspense fallback={<DeliveryMethodsSkeleton />}>
						<DeliveryMethods collapsed={showOnlyContact} locale={locale} languageCode={languageCode} />
					</Suspense>
					<Suspense fallback={<PaymentSectionSkeleton />}>
						<CollapseSection collapse={showOnlyContact}>
							<PaymentSection languageCode={languageCode} />
						</CollapseSection>
					</Suspense>
				</>
			</div>
		</div>
	);
};
