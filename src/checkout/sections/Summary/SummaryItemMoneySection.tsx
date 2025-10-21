import { useTranslations } from "next-intl";
import { type OrderLineFragment } from "@/checkout/graphql";
import { SummaryItemMoneyInfo } from "@/checkout/sections/Summary/SummaryItemMoneyInfo";

interface LineItemQuantitySelectorProps {
	line: OrderLineFragment;
}

export const SummaryItemMoneySection: React.FC<LineItemQuantitySelectorProps> = ({ line }) => {
	const t = useTranslations("auth");
	return (
		<div className="flex flex-col items-end">
			<p>
				{t("qty")}: {line.quantity}
			</p>
			<SummaryItemMoneyInfo {...line} undiscountedUnitPrice={line.undiscountedUnitPrice.gross} />
		</div>
	);
};
