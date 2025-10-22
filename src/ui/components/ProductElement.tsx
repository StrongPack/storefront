// import { useLocale } from "next-intl";
import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";
import type { ProductListItemFragment } from "@/gql/graphql";
import { formatMoneyRange } from "@/lib/utils";
import { getChannelConfig } from "@/lib/channelConfig";

export async function ProductElement({
	product,
	loading,
	channel,
	priority,
}: { product: ProductListItemFragment } & {
	loading: "eager" | "lazy";
	channel: string;
	priority?: boolean;
}) {
	// console.log(product);

	const { locale } = await getChannelConfig(channel);
	const isFa = locale === "fa";

	const translation = product.translation;
	const displayName = isFa && translation?.name ? translation.name : product.name;

	const productTranslation = product.category?.translation;
	const categoryName = isFa && productTranslation?.name ? productTranslation.name : product.category?.name;

	return (
		<li data-testid="ProductElement">
			<LinkWithChannel href={`/products/${product.slug}`} key={product.id}>
				<div>
					{product?.thumbnail?.url && (
						<ProductImageWrapper
							loading={loading}
							src={product.thumbnail.url}
							alt={product.thumbnail.alt ?? ""}
							width={512}
							height={512}
							sizes={"512px"}
							priority={priority}
						/>
					)}
					<div className="mt-2 flex justify-between">
						<div>
							<h3 className="mt-1 text-sm font-semibold text-neutral-900">{displayName}</h3>
							<p className="mt-1 text-sm text-neutral-500" data-testid="ProductElement_Category">
								{categoryName}
							</p>
						</div>
						<p className="mt-1 text-sm font-medium text-neutral-900" data-testid="ProductElement_PriceRange">
							{formatMoneyRange(
								{
									start: product?.pricing?.priceRange?.start?.gross,
									stop: product?.pricing?.priceRange?.stop?.gross,
								},
								locale,
							)}
						</p>
					</div>
				</div>
			</LinkWithChannel>
		</li>
	);
}
