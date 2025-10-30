// OurCustomers.tsx
"use client";

import React, { useRef, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronRightIcon } from "@/checkout/assets/icons/chevron_right_icon";
import { ChevronLeftIcon } from "@/checkout/assets/icons/chevron_left_icon";

interface OurCustomersProps {
	dir: "ltr" | "rtl";
}

export const customerLogos = [
	{ name: "Brand A", path: "/logos/brand-a.svg" },
	// { name: "Brand B", path: "/logos/brand-b.svg" },
	// { name: "Brand C", path: "/logos/brand-c.svg" },
	// { name: "Brand D", path: "/logos/brand-d.svg" },
	// { name: "Brand E", path: "/logos/brand-e.svg" },
	// { name: "Brand F", path: "/logos/brand-f.svg" },
	// { name: "Brand G", path: "/logos/brand-g.svg" },
	// { name: "Brand H", path: "/logos/brand-h.svg" },
];

export const OurCustomers: React.FC<OurCustomersProps> = ({ dir }) => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const t = useTranslations("common");
	const isRTL = dir === "rtl";

	const handleScroll = useCallback(
		(direction: "prev" | "next") => {
			if (scrollRef.current) {
				const container = scrollRef.current;
				const scrollStep = container.clientWidth;

				let newScrollPosition = container.scrollLeft;

				if (isRTL) {
					if (direction === "next") {
						newScrollPosition += scrollStep;
					} else {
						newScrollPosition -= scrollStep;
					}
				} else {
					// در LTR (معمولی)
					if (direction === "next") {
						newScrollPosition += scrollStep;
					} else {
						newScrollPosition -= scrollStep;
					}
				}

				container.scrollTo({
					left: newScrollPosition,
					behavior: "smooth",
				});
			}
		},
		[isRTL],
	);

	const PrevIcon = isRTL ? ChevronRightIcon : ChevronLeftIcon;
	const NextIcon = isRTL ? ChevronLeftIcon : ChevronRightIcon;

	return (
		<section className="relative py-16">
			<div className="container mx-auto px-4">
				<h2 className="mb-10 text-center text-3xl font-bold" dir={dir}>
					{t("our_customers.title")}
				</h2>

				<div className="relative">
					<button
						onClick={() => handleScroll("prev")}
						className={`absolute top-1/2 z-10 -mt-6 rounded-full bg-white p-3 shadow-lg transition-all duration-300 hover:bg-neutral-100 disabled:opacity-50`}
						style={isRTL ? { right: "-12px" } : { left: "-12px" }}
						aria-label="Previous logos"
					>
						<PrevIcon className="h-6 w-6 text-neutral-800" />
					</button>

					<button
						onClick={() => handleScroll("next")}
						className={`absolute top-1/2 z-10 -mt-6 rounded-full bg-white p-3 shadow-lg transition-all duration-300 hover:bg-neutral-100 disabled:opacity-50`}
						style={isRTL ? { left: "-12px" } : { right: "-12px" }}
						aria-label="Next logos"
					>
						<NextIcon className="h-6 w-6 text-neutral-800" />
					</button>

					<div
						ref={scrollRef}
						className="scroll-snap-x-mandatory flex gap-x-6 overflow-x-scroll px-2 scrollbar-hide"
						style={{
							direction: dir,
							scrollSnapType: "x mandatory",
						}}
					>
						{customerLogos.map((logo, index) => (
							<div
								key={index}
								className="flex h-[100px] w-1/4 flex-shrink-0 items-center justify-center rounded-lg border p-10 transition duration-200 hover:shadow-md sm:w-1/5 md:w-1/6 lg:w-[200px]"
								// className="scroll-snap-center min-w-[140px] flex-shrink-0 rounded-lg bg-white p-3 shadow-sm"
								style={{ scrollSnapAlign: "start" }}
							>
								<Image
									src={logo.path}
									alt={logo.name}
									width={150}
									height={50}
									objectFit="contain"
									className="opacity-70 grayscale transition-opacity hover:opacity-100 hover:grayscale-0"
									// className="mx-auto object-contain"
								/>
							</div>
						))}
						<div className="h-1 w-4 flex-shrink-0" />
					</div>
				</div>
			</div>
		</section>
	);
};
