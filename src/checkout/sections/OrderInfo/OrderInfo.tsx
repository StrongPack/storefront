import { useTranslations } from "next-intl";
import { DeliverySection } from "./DeliverySection";
import { PaymentSection } from "./PaymentSection";
import { Section } from "./Section";
import { Address } from "@/checkout/components/Address";
import { useOrder } from "@/checkout/hooks/useOrder";
import { type LanguageCodeEnum } from "@/gql/graphql";
export const OrderInfo = ({ languageCode }: { languageCode: LanguageCodeEnum }) => {
	const t = useTranslations("auth");
	const {
		order: { deliveryMethod, shippingAddress, billingAddress, userEmail },
	} = useOrder(languageCode);

	return (
		<section className="mt-8">
			<PaymentSection languageCode={languageCode} />
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
