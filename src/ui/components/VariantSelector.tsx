import { clsx } from "clsx";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { type ProductListItemFragment, type VariantDetailsFragment } from "@/gql/graphql";
import { getHrefForVariant } from "@/lib/utils";

export async function VariantSelector({
	variants,
	product,
	selectedVariant,
	channel,
	locale,
}: {
	variants: readonly VariantDetailsFragment[];
	product: ProductListItemFragment;
	selectedVariant?: VariantDetailsFragment;
	channel: string;
	locale: string;
}) {
	const t = await getTranslations({ locale, namespace: "common" });
	if (!selectedVariant && variants.length === 1 && variants[0]?.quantityAvailable) {
		redirect("/" + channel + getHrefForVariant({ productSlug: product.slug, variantId: variants[0].id }));
	}

	return (
		variants.length > 1 && (
			<fieldset className="my-4" role="radiogroup" data-testid="VariantSelector">
				<legend className="sr-only">{t("variants_legend")}</legend>
				<div className="flex flex-wrap gap-3">
					{variants.map((variant) => {
						const isDisabled = !variant.quantityAvailable;
						const isCurrentVariant = selectedVariant?.id === variant.id;
						return (
							<LinkWithChannel
								key={variant.id}
								prefetch={true}
								scroll={false}
								href={
									isDisabled ? "#" : getHrefForVariant({ productSlug: product.slug, variantId: variant.id })
								}
								className={clsx(
									isCurrentVariant
										? "border-transparent bg-neutral-900 text-white hover:bg-neutral-800"
										: "border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-100",
									"relative flex min-w-[5ch] items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap rounded border p-3 text-center text-sm font-semibold focus-within:outline focus-within:outline-2 aria-disabled:cursor-not-allowed aria-disabled:bg-neutral-100 aria-disabled:text-neutral-800 aria-disabled:opacity-50",
									isDisabled && "pointer-events-none",
								)}
								role="radio"
								tabIndex={isDisabled ? -1 : undefined}
								aria-checked={isCurrentVariant}
								aria-disabled={isDisabled}
							>
								{variant.name}
							</LinkWithChannel>
						);
					})}
				</div>
			</fieldset>
		)
	);
}
