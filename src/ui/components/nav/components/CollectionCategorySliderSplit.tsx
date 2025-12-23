"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

type CategoryItem = {
	id: string;
	label: string;
	image: string;
	href: string;
};

type CollectionCategorySliderSplitProps = {
	sliderItems: CategoryItem[];
	staticItems: CategoryItem[];
	isRTL?: boolean;
};

export const CollectionCategorySliderSplit = ({
	sliderItems,
	staticItems,
	isRTL = false,
}: CollectionCategorySliderSplitProps) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [paused, setPaused] = useState(false);

	useEffect(() => {
		if (paused) return;
		const interval = setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % sliderItems.length);
		}, 10000);
		return () => clearInterval(interval);
	}, [sliderItems.length, paused]);

	const firstCard = staticItems[0];
	const remainingCards = staticItems.slice(1);

	return (
		<section className="flex w-full flex-col gap-4" dir={isRTL ? "rtl" : "ltr"}>
			{/* 🔹 دسکتاپ: اسلایدر + کارت اول */}
			<div className="hidden gap-4 sm:grid sm:grid-cols-[2fr_1fr]">
				{/* اسلایدر */}
				<div
					className="relative aspect-[16/9] overflow-hidden rounded-xl sm:aspect-auto sm:min-h-[380px]"
					onMouseEnter={() => setPaused(true)}
					onMouseLeave={() => setPaused(false)}
				>
					<AnimatePresence mode="wait">
						{sliderItems.map(
							(item, index) =>
								index === activeIndex && (
									<motion.div
										key={item.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
										transition={{ duration: 0.6, ease: "easeInOut" }}
										className="absolute inset-0"
									>
										<LinkWithChannel href={item.href} className="relative block h-full w-full">
											{/* 										
											<Image
												src={item.image || "/images/placeholder-category.png"}
												alt={item.label}
												fill
												className="rounded-xl object-cover"
											/> */}

											{/* 👇 پس‌زمینه بلور شده */}
											<Image
												src={item.image || "/images/placeholder-category.png"}
												alt={item.label}
												fill
												className="absolute inset-0 scale-110 object-cover blur-md brightness-90"
												aria-hidden // تصویر پس‌زمینه است
											/>

											{/* 👇 تصویر اصلی در وسط */}
											{/* <div className="relative flex h-full w-full items-center justify-center">
												<Image
													src={item.image || "/images/placeholder-category.png"}
													alt={item.label}
													width={512}
													height={512}
													className="z-10 object-contain"
												/>
											</div> */}

											<div className="relative flex h-full w-full items-center justify-center overflow-hidden">
												<Image
													src={item.image || "/images/placeholder-category.png"}
													alt={item.label}
													width={600}
													height={600}
													className="z-10 max-h-full object-contain"
													style={{ maxHeight: "100%", height: "auto", width: "auto" }}
												/>
											</div>

											<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
											<motion.p
												initial={{ y: 20, opacity: 0 }}
												animate={{ y: 0, opacity: 1 }}
												exit={{ y: -10, opacity: 0 }}
												transition={{ duration: 0.4 }}
												className="absolute bottom-5 z-20 w-full text-center text-lg font-semibold text-white drop-shadow-lg  md:text-xl"
											>
												{item.label}
											</motion.p>
										</LinkWithChannel>
									</motion.div>
								),
						)}
					</AnimatePresence>

					{/* نقاط (Indicators) */}
					<div className="absolute inset-x-0 bottom-3 z-30 flex justify-center gap-2">
						{sliderItems.map((_, index) => (
							<button
								key={index}
								onClick={() => setActiveIndex(index)}
								className={`h-3 w-3 rounded-full transition-all ${
									index === activeIndex ? "scale-110 bg-amber-500 shadow-lg" : "bg-white/60 hover:bg-white/80"
								}`}
							/>
						))}
					</div>
				</div>

				{/* کارت ثابت کنار اسلایدر */}
				{firstCard && <Card item={firstCard} fullHeight />}
			</div>

			{/* 🔹 موبایل: فقط اسلایدر تمام‌عرض */}
			<div className="sm:hidden">
				<div
					className="relative aspect-[16/9] w-full overflow-hidden rounded-xl"
					onMouseEnter={() => setPaused(true)}
					onMouseLeave={() => setPaused(false)}
				>
					<AnimatePresence mode="wait">
						{sliderItems.map(
							(item, index) =>
								index === activeIndex && (
									<motion.div
										key={item.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
										transition={{ duration: 0.6, ease: "easeInOut" }}
										className="absolute inset-0"
									>
										<LinkWithChannel href={item.href} className="relative block h-full w-full">
											{/* <Image
												src={item.image || "/images/placeholder-category.png"}
												alt={item.label}
												fill
												className="object-cover"
											/> */}

											{/* پس‌زمینه بلور */}
											<Image
												src={item.image || "/images/placeholder-category.png"}
												alt={item.label}
												fill
												className="absolute inset-0 scale-110 object-cover blur-md brightness-90"
												aria-hidden
											/>

											{/* تصویر اصلی */}
											{/* <div className="relative flex h-full w-full items-center justify-center">
												<Image
													src={item.image || "/images/placeholder-category.png"}
													alt={item.label}
													width={256}
													height={256}
													className="z-10 object-contain"
												/>
											</div> */}

											<div className="relative flex h-full w-full items-center justify-center overflow-hidden">
												<Image
													src={item.image || "/images/placeholder-category.png"}
													alt={item.label}
													width={256}
													height={256}
													className="z-10 max-h-full object-contain"
													style={{ maxHeight: "100%", height: "auto", width: "auto" }}
												/>
											</div>

											<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
											<motion.p
												initial={{ y: 20, opacity: 0 }}
												animate={{ y: 0, opacity: 1 }}
												exit={{ y: -10, opacity: 0 }}
												transition={{ duration: 0.4 }}
												className="absolute bottom-4 z-20 w-full text-center text-base font-semibold text-white  drop-shadow"
											>
												{item.label}
											</motion.p>
										</LinkWithChannel>
									</motion.div>
								),
						)}
					</AnimatePresence>

					<div className="absolute inset-x-0 bottom-3  z-[50] flex justify-center gap-2">
						{sliderItems.map((_, index) => (
							<button
								key={index}
								onClick={() => setActiveIndex(index)}
								className={`h-2.5 w-2.5 rounded-full transition-all ${
									index === activeIndex ? "scale-110 bg-amber-500 shadow-md" : "bg-white/60 hover:bg-white/80"
								}`}
							/>
						))}
					</div>
				</div>
			</div>

			{/* 🔹 گرید کارت‌ها */}
			{/* در دسکتاپ فقط remainingCards، در موبایل کل staticItems */}
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
				{remainingCards.map((item) => (
					<Card key={item.id} item={item} className="hidden sm:block" />
				))}
				{staticItems.map((item) => (
					<Card key={item.id + "-mobile"} item={item} className="sm:hidden" />
				))}
			</div>
		</section>
	);
};

// 🌿 کارت واحد
const Card = ({
	item,
	fullHeight = false,
	className = "",
}: {
	item: CategoryItem;
	fullHeight?: boolean;
	className?: string;
}) => (
	<LinkWithChannel
		href={item.href}
		className={`group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-50 to-white shadow transition-transform hover:-translate-y-1 ${className} ${
			fullHeight ? "sm:min-h-[380px]" : "aspect-[4/3]"
		}`}
	>
		<Image
			src={item.image || "/images/placeholder-category.png"}
			alt={item.label}
			fill
			className="object-cover transition-transform duration-700 group-hover:scale-105"
		/>
		<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent" />
		<p className="absolute bottom-3 w-full text-center text-sm font-semibold text-white md:text-base">
			{item.label}
		</p>
	</LinkWithChannel>
);
