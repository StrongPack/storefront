// /lib/productDisplayData.ts
import edjsHTML from "editorjs-html";
import { type ProductListItemFragment } from "@/gql/graphql";

const parser = edjsHTML();

/**
 * استخراج داده‌های نمایش و SEO برای صفحات محصول
 */
export function getProductDisplayData(product: ProductListItemFragment, isNotEn: boolean) {
	const productTranslation = product.translation;

	// نام محصول و عنوان SEO
	const name = (isNotEn && productTranslation?.name) || product.name;
	const seoTitle = (isNotEn && productTranslation?.seoTitle) || product.seoTitle;
	const seoDescription = (isNotEn && productTranslation?.seoDescription) || product.seoDescription;

	// دسته
	const categoryName = (isNotEn && product.category?.translation?.name) || product.category?.name;

	// متادیتاها
	const keywordsEntry = product.metadata?.find((m) => m.key === "keywords");
	const keyWords = keywordsEntry?.value;

	// توضیحات EditorJS
	const descriptionJson = (isNotEn && productTranslation?.description) || product.description;
	const descriptionHtml = descriptionJson ? parser.parse(JSON.parse(descriptionJson)) : null;

	// variant انتخاب‌شده
	// const selectedVariantID = searchParams.variant;
	// const selectedVariant = variants?.find(({ id }) => id === selectedVariantID);
	// const selectedVariantName = (isNotEn && selectedVariant?.translation?.name) || selectedVariant?.name;
	// const nameWithVariant = selectedVariantName ? `${name} - ${selectedVariantName}` : name;

	return {
		isNotEn,
		name,
		seoTitle,
		seoDescription,
		categoryName,
		keyWords,
		descriptionHtml,
		// selectedVariant,
		// selectedVariantName,
		// nameWithVariant,
	};
}
