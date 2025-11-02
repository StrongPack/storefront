"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Title } from "@/checkout/components/Title";
import { useCheckout } from "@/checkout/hooks/useCheckout";
import { SelectBox } from "@/checkout/components/SelectBox";
import { SelectBoxGroup } from "@/checkout/components/SelectBoxGroup";
import { getFormattedMoney } from "@/checkout/lib/utils/money";
import { Divider } from "@/checkout/components/Divider";
import { type CommonSectionProps } from "@/checkout/lib/globalTypes";
import { useDeliveryMethodsForm } from "@/checkout/sections/DeliveryMethods/useDeliveryMethodsForm";
import { FormProvider } from "@/checkout/hooks/useForm/FormProvider";
import { useCheckoutUpdateState } from "@/checkout/state/updateStateStore";
import { DeliveryMethodsSkeleton } from "@/checkout/sections/DeliveryMethods/DeliveryMethodsSkeleton";
import { useUser } from "@/checkout/hooks/useUser";

export const DeliveryMethods: React.FC<CommonSectionProps> = ({ collapsed, locale, languageCode }) => {
	const t = useTranslations("auth");
	const { checkout } = useCheckout({ languageCode });
	const { authenticated } = useUser();
	const { shippingMethods, shippingAddress } = checkout;
	const form = useDeliveryMethodsForm(languageCode);
	const { updateState } = useCheckoutUpdateState();

	const getSubtitle = ({ min, max }: { min?: number | null; max?: number | null }) => {
		if (!min || !max) {
			return undefined;
		}

		return `${min}-${max} ${t("businessDaysRange")}`;
	};

	// console.log(checkout, collapsed);

	// const err = new Error();
	// const stackLines = (err.stack || "")
	// 	.split("\n")
	// 	.filter((l) => !l.includes("node_modules")) // خطوط داخلی React حذف شود
	// 	.slice(2, 100) // چند خط کافی است
	// 	.map((l) => l.trim());

	// console.groupCollapsed(`[useCheckout] checkout`, "color:#00bfff");
	// console.log("stack trace:\n", stackLines.join("\n"));
	// console.groupEnd();

	// console.log(authenticated, shippingAddress, updateState);

	if (!checkout?.isShippingRequired || collapsed) {
		return null;
	}

	return (
		<FormProvider form={form}>
			<Divider />
			<div className="py-4" data-testid="deliveryMethods">
				<Title className="mb-2">{t("deliveryMethods")}</Title>
				{!authenticated && !shippingAddress && <p>{t("fillShippingToSeeMethods")}</p>}
				{authenticated && !shippingAddress && updateState.checkoutShippingUpdate ? (
					<DeliveryMethodsSkeleton />
				) : (
					<SelectBoxGroup label={t("deliveryMethodsGroupLabel")}>
						{shippingMethods?.map(
							({ id, name, price, minimumDeliveryDays: min, maximumDeliveryDays: max }) => (
								<SelectBox key={id} name="selectedMethodId" value={id}>
									<div className="pointer-events-none flex min-h-12 grow flex-col justify-center">
										<div className="flex flex-row items-center justify-between self-stretch">
											<p>{name}</p>
											<p>{getFormattedMoney(price, locale)}</p>
										</div>
										<p className="font-xs" color="secondary">
											{getSubtitle({ min, max })}
										</p>
									</div>
								</SelectBox>
							),
						)}
					</SelectBoxGroup>
				)}
			</div>
		</FormProvider>
	);
};
