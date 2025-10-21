import { useTranslations } from "next-intl";
import { DeliverySection } from "./DeliverySection";
import { PaymentSection } from "./PaymentSection";
import { Section } from "./Section";
import { Address } from "@/checkout/components/Address";
import { useOrder } from "@/checkout/hooks/useOrder";

export const OrderInfo = () => {
	const t = useTranslations("auth");
	const {
		order: { deliveryMethod, shippingAddress, billingAddress, userEmail },
	} = useOrder();

	return (
		<section className="mt-8">
			<PaymentSection />
			<DeliverySection deliveryMethod={deliveryMethod} />
			<Section title={t("contactDetails")}>
				<p>{userEmail}</p>
			</Section>
			{shippingAddress && (
				<Section title={t("shippingAddress")}>
					<Address address={shippingAddress} />
				</Section>
			)}
			{billingAddress && (
				<Section title={t("billingAddress")}>
					<Address address={billingAddress} />
				</Section>
			)}
		</section>
	);
};
