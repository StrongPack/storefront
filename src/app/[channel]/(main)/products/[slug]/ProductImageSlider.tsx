"use client";

import { type FC } from "react";
// import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";

interface ProductImage {
	id: string;
	url: string;
	alt?: string | null;
	sortOrder?: number | null;
}

interface Props {
	images: ProductImage[];
	fallback?: { url: string; alt?: string | null };
	displayName?: string;
}

const ProductImageSlider: FC<Props> = ({ images, fallback, displayName }) => {
	const hasImages = Array.isArray(images) && images.length > 0;

	if (!hasImages && fallback) {
		return (
			<ProductImageWrapper
				priority={true}
				alt={fallback.alt ?? ""}
				width={1024}
				height={1024}
				src={fallback.url}
			/>
		);
	}

	return (
		<Swiper
			modules={[Navigation, Pagination, Autoplay]}
			spaceBetween={10}
			slidesPerView={1}
			navigation={{ enabled: true }}
			pagination={{ clickable: true, dynamicBullets: true }}
			autoplay={{ delay: 3000 }}
			loop
			className="overflow-hidden rounded-lg md:rounded-xl"
		>
			{images
				.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
				.map((img) => (
					<SwiperSlide key={img.id}>
						<ProductImageWrapper
							priority={true}
							alt={img.alt ?? displayName ?? ""}
							width={1024}
							height={1024}
							src={img.url}
							className="h-[280px] sm:h-[360px] md:h-[480px] lg:h-[600px]"
						/>
					</SwiperSlide>
				))}
		</Swiper>
	);
};

export default ProductImageSlider;
