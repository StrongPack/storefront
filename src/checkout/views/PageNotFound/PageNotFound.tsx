import { type FallbackProps } from "react-error-boundary";
import { useTranslations } from "next-intl";
// import { SaleorLogo } from "@/checkout/assets/images/SaleorLogo";
import { Button } from "@/checkout/components/Button";
import { ErrorContentWrapper } from "@/checkout/components/ErrorContentWrapper";

export const PageNotFound = ({ error }: Partial<FallbackProps>) => {
	const t = useTranslations("checkout");
	const t2 = useTranslations("common");
	const companyName = t2("site_name");
	console.error(error);

	// eslint-disable-next-line no-restricted-globals
	const goBack = () => history.back();

	return (
		<ErrorContentWrapper>
			<div className="mb-4 flex w-28 flex-col">
				{/* <SaleorLogo /> */}
				<img src="/20pack.webp" alt={`${companyName} logo`} width={128} height={128} className="mr-2" />
			</div>
			<p>{t("page_not_found_text")}</p>
			<Button
				ariaLabel={t("go_back_button")}
				onClick={goBack}
				variant="secondary"
				label={t("go_back_button")}
			/>
		</ErrorContentWrapper>
	);
};
