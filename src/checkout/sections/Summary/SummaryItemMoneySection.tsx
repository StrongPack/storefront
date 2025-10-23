import { useTranslations } from "next-intl";
import { type OrderLineFragment } from "@/checkout/graphql";
import { SummaryItemMoneyInfo } from "@/checkout/sections/Summary/SummaryItemMoneyInfo";

interface LineItemQuantitySelectorProps {
	line: OrderLineFragment;
	locale: string;
}

export const SummaryItemMoneySection: React.FC<LineItemQuantitySelectorProps> = ({ line, locale }) => {
	const t = useTranslations("auth");
	return (
		<div className="flex flex-col items-end">
			<p>
				{t("qty")}: {line.quantity}
			</p>
			<SummaryItemMoneyInfo
				{...line}
				locale={locale}
				undiscountedUnitPrice={line.undiscountedUnitPrice.gross}
			/>
		</div>
	);
};
