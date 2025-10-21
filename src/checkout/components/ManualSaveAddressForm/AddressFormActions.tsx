import { useTranslations } from "next-intl";
import { Button } from "@/checkout/components/Button";
import { IconButton } from "@/checkout/components/IconButton";
import { TrashIcon } from "@/checkout/ui-kit/icons";

interface AddressFormActionsProps {
	onDelete?: () => void;
	onCancel: () => void;
	onSubmit: () => void;
	loading: boolean;
}

export const AddressFormActions: React.FC<AddressFormActionsProps> = ({
	onSubmit,
	onDelete,
	onCancel,
	loading,
}) => {
	const t = useTranslations("ui");
	return (
		<div className="flex flex-row justify-end gap-2">
			{onDelete && (
				<div className="flex">
					<IconButton ariaLabel={t("deleteAddress")} onClick={onDelete} icon={<TrashIcon aria-hidden />} />
				</div>
			)}

			<Button ariaLabel={t("cancel")} variant="secondary" onClick={onCancel} label={t("cancel")} />
			{loading ? (
				<Button
					ariaDisabled
					ariaLabel={t("saveAddress")}
					onClick={(e) => e.preventDefault()}
					label={t("processing")}
				/>
			) : (
				<Button ariaLabel={t("saveAddress")} onClick={onSubmit} label={t("saveAddress")} />
			)}
		</div>
	);
};
