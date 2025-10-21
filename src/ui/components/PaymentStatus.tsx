import { AlertCircleIcon, CheckCircleIcon, ClockIcon, XCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { PaymentChargeStatusEnum } from "@/gql/graphql";

type Props = {
	status: PaymentChargeStatusEnum;
	locale: string;
};

export const PaymentStatus = async ({ status, locale }: Props) => {
	const t = await getTranslations({ locale, namespace: "orders" });

	switch (status) {
		case PaymentChargeStatusEnum.NotCharged:
			return (
				<p className="flex items-center gap-1 text-red-400">
					<XCircle className="h-4 w-4" aria-hidden />
					{t("payment_unpaid")}
				</p>
			);
		case PaymentChargeStatusEnum.Cancelled:
			return (
				<p className="flex items-center gap-1 text-red-400">
					<XCircle className="h-4 w-4" aria-hidden />
					{t("payment_cancelled")}
				</p>
			);
		case PaymentChargeStatusEnum.Refused:
			return (
				<p className="flex items-center gap-1 text-red-400">
					<XCircle className="h-4 w-4" aria-hidden />

					{t("payment_refused")}
				</p>
			);
		case PaymentChargeStatusEnum.FullyCharged:
			return (
				<p className="flex items-center gap-1 text-green-600">
					<CheckCircleIcon className="h-4 w-4" aria-hidden />

					{t("payment_paid")}
				</p>
			);
		case PaymentChargeStatusEnum.FullyRefunded:
			return (
				<p className="flex items-center gap-1 text-green-600">
					<CheckCircleIcon className="h-4 w-4" aria-hidden />

					{t("payment_refunded")}
				</p>
			);
		case PaymentChargeStatusEnum.PartiallyCharged:
			return (
				<p className="flex items-center gap-1 text-yellow-500">
					<AlertCircleIcon className="h-4 w-4" aria-hidden />

					{t("payment_partially_paid")}
				</p>
			);
		case PaymentChargeStatusEnum.PartiallyRefunded:
			return (
				<p className="flex items-center gap-1 text-yellow-500">
					<AlertCircleIcon className="h-4 w-4" aria-hidden />

					{t("payment_partially_refunded")}
				</p>
			);
		case PaymentChargeStatusEnum.Pending:
			return (
				<p className="flex items-center gap-1 text-yellow-500">
					<ClockIcon className="h-4 w-4" aria-hidden />
					{t("payment_pending")}
				</p>
			);
	}
};
