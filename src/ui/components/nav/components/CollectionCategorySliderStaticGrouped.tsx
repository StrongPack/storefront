"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

type CollectionGroup = {
	id: string;
	label: string;
	image: string;
	href: string;
	children: {
		id: string;
		label: string;
		image: string;
		href: string;
	}[];
};

export const CollectionCategorySliderStaticGrouped = ({
	groups,
	isRTL = false,
}: {
	groups: CollectionGroup[];
	isRTL?: boolean;
}) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [paused, setPaused] = useState(false);
	const sliderRef = useRef<HTMLDivElement>(null);

	// 🎞 تغییر خودکار دسته‌ها (با توقف در hover)
	useEffect(() => {
		if (paused) return;
		const interval = setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % groups.length);
		}, 4500);
		return () => clearInterval(interval);
	}, [groups.length, paused]);

	// 📜 اسکرول خودکار نرم
	useEffect(() => {
		if (!sliderRef.current) return;
		const el = sliderRef.current;
		const scrollAmount = el.clientWidth;
		const scrollTo = isRTL ? el.scrollWidth - (activeIndex + 1) * scrollAmount : activeIndex * scrollAmount;
		el.scrollTo({ left: scrollTo, behavior: "smooth" });
	}, [activeIndex, isRTL]);

	return (
		<div className="space-y-10">
			{/* 🔹 اسلایدر دسته‌بندی‌ها */}
			<div
				ref={sliderRef}
				dir={isRTL ? "rtl" : "ltr"}
				className="flex overflow-hidden scroll-smooth rounded-lg"
				onMouseEnter={() => setPaused(true)}
				onMouseLeave={() => setPaused(false)}
			>
				<AnimatePresence mode="wait">
					{groups.map((group, index) =>
						index === activeIndex ? (
							<motion.div
								key={group.id}
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ duration: 0.8, ease: "easeInOut" }}
								className="relative w-full flex-shrink-0"
							>
								<LinkWithChannel
									href={group.href}
									className="relative h-44 w-full overflow-hidden rounded-lg"
								>
									<Image
										src={group.image || "/images/placeholder-category.png"}
										alt={group.label}
										fill
										className="rounded-lg object-cover"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />
									<motion.p
										initial={{ y: 30, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										exit={{ y: -20, opacity: 0 }}
										transition={{ duration: 0.6 }}
										className="absolute bottom-3 w-full text-center text-lg font-semibold text-white drop-shadow-lg"
									>
										{group.label}
									</motion.p>
								</LinkWithChannel>
							</motion.div>
						) : null,
					)}
				</AnimatePresence>
			</div>

			{/* 🔹 زیردسته‌ها با انیمیشن تغییر بین مجموعه‌ها */}
			<div className="relative min-h-[160px]">
				<AnimatePresence mode="wait">
					{groups[activeIndex] && (
						<motion.div
							key={"children-" + groups[activeIndex].id}
							initial={{ opacity: 0, y: 15 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -15 }}
							transition={{ duration: 0.7, ease: "easeOut" }}
							className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
						>
							{groups[activeIndex].children.map((child) => (
								<LinkWithChannel
									key={child.id}
									href={child.href}
									className="group relative h-32 w-full overflow-hidden rounded-xl bg-gradient-to-br from-amber-50 to-white shadow"
								>
									<Image
										src={child.image || "/images/placeholder-category.png"}
										alt={child.label}
										fill
										className="object-cover transition-transform duration-700 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
									<p className="absolute bottom-2 w-full text-center text-sm font-medium text-white">
										{child.label}
									</p>
								</LinkWithChannel>
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};
