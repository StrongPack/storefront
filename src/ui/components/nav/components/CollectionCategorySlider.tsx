"use client";

import { useRef } from "react";
import Image from "next/image";
// import Link from "next/link";
import { ChevronRightIcon } from "@/checkout/assets/icons/chevron_right_icon";
import { ChevronLeftIcon } from "@/checkout/assets/icons/chevron_left_icon";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

type SliderItem = {
	id: string;
	label: string;
	href: string;
	image: string;
};

export const CollectionCategorySlider = ({
	items,
	isRTL = false,
}: {
	items: SliderItem[];
	isRTL?: boolean;
}) => {
	const scrollRef = useRef<HTMLDivElement>(null);

	const scroll = (dir: "left" | "right") => {
		if (!scrollRef.current) return;
		const scrollAmount = scrollRef.current.clientWidth * 0.75;
		scrollRef.current.scrollBy({
			left: dir === "left" ? (isRTL ? scrollAmount : -scrollAmount) : isRTL ? -scrollAmount : scrollAmount,
			behavior: "smooth",
		});
	};

	return (
		<div className="relative mb-16">
			{/* دکمه چپ */}
			<button
				onClick={() => scroll("left")}
				className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur transition-all duration-200 hover:bg-white"
			>
				{isRTL ? (
					<ChevronRightIcon className="h-6 w-6 text-gray-700" />
				) : (
					<ChevronLeftIcon className="h-6 w-6 text-gray-700" />
				)}
			</button>

			<div
				ref={scrollRef}
				className="flex gap-6 overflow-x-auto scroll-smooth px-12 scrollbar-hide"
				dir={isRTL ? "rtl" : "ltr"}
			>
				{items.map((item) => (
					<LinkWithChannel
						key={item.id}
						href={item.href}
						className="group relative h-40 w-60 flex-shrink-0 overflow-hidden rounded-xl shadow-md"
						// className={clsx(
						//     isActive ? "border-neutral-900 text-neutral-900" : "border-transparent text-neutral-500",
						//     "inline-flex items-center border-b-2 pt-px text-sm font-medium hover:text-neutral-700",
						// )}
					>
						{/* تصویر */}
						<Image
							src={item.image || "/images/placeholder-category.png"}
							alt={item.label}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						{/* گرادیان روی تصویر */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
						{/* عنوان روی تصویر */}
						<p className="absolute bottom-3 w-full text-center text-base font-semibold text-white drop-shadow-lg transition-opacity duration-300 group-hover:opacity-90">
							{item.label}
						</p>
						{/* افکت هنگام hover */}
						<div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />
					</LinkWithChannel>
				))}
			</div>

			{/* دکمه راست */}
			<button
				onClick={() => scroll("right")}
				className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur transition-all duration-200 hover:bg-white"
			>
				{isRTL ? (
					<ChevronLeftIcon className="h-6 w-6 text-gray-700" />
				) : (
					<ChevronRightIcon className="h-6 w-6 text-gray-700" />
				)}
			</button>
		</div>
	);
};
