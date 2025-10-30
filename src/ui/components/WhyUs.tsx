"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export const WhyUs = ({ dir }: { dir: string }) => {
	const t = useTranslations("common");
	const isRTL = dir === "rtl";
	const [isMobile, setIsMobile] = useState(false);

	// تشخیص موبایل برای غیرفعال‌سازی انیمیشن در نمایش موبایل
	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 640);
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const reasonKeys = [
		"best_price",
		"multiple_services",
		"strong_team",
		"fast_delivery",
		"quality_guarantee",
		"wholesale_retail",
		"free_consult",
	];

	// const reasonsData = [
	// 	{
	// 		img: "/reasons/best-price-color.png",
	// 		title: "بهترین قیمت",
	// 		desc: "ارائه پایین‌ترین قیمت در بازار با حفظ بالاترین کیفیت بسته‌بندی.",
	// 	},
	// 	{
	// 		img: "/reasons/multiple-services-color.png",
	// 		title: "خدمات متعدد",
	// 		desc: "از طراحی تا تولید و چاپ، همه‌چیز را به صورت یکجا برایتان انجام می‌دهیم.",
	// 	},
	// 	{
	// 		img: "/reasons/strong-team-color.png",
	// 		title: "تیم اجرایی قوی",
	// 		desc: "گروهی حرفه‌ای از متخصصان حوزه چاپ و بسته‌بندی در خدمت شما.",
	// 	},
	// 	{
	// 		img: "/reasons/fast-delivery-color.png",
	// 		title: "تحویل زودتر از موعد",
	// 		desc: "تعهد به زمان تحویل؛ حتی زودتر از موعد اعلام‌شده.",
	// 	},
	// 	{
	// 		img: "/reasons/quality-guarantee-color.png",
	// 		title: "ضمانت کیفیت تولید",
	// 		desc: "استفاده از بهترین متریال و کنترل دقیق مراحل تولید.",
	// 	},
	// 	{
	// 		img: "/reasons/wholesale-retail-color.png",
	// 		title: "فروش عمده و خرده",
	// 		desc: "سرویس ویژه برای فروش عمده شرکت‌ها و سفارشات شخصی.",
	// 	},
	// 	{
	// 		img: "/reasons/free-consult-color.png",
	// 		title: "مشاوره رایگان",
	// 		desc: "پیش از سفارش، با متخصصانمان مشورت کنید و بهترین انتخاب را داشته باشید.",
	// 	},
	// ];

	const loopData = [...reasonKeys, ...reasonKeys]; // برای loop بی‌انتها

	return (
		<section className="border-t border-neutral-200 bg-neutral-100 py-10">
			<div className="mx-auto max-w-7xl overflow-hidden px-4 lg:px-8">
				<h2 className={`mb-8 text-center text-2xl font-bold ${isRTL ? "font-vazirmatn" : "font-sans"}`}>
					{t("why_buy_from_20pack")}
				</h2>

				{/* نسخه موبایل: گرید دو ستونه و بدون انیمیشن */}
				{isMobile ? (
					<div className="grid grid-cols-2 gap-4 sm:hidden">
						{reasonKeys.map((reason, i) => (
							<div
								key={i}
								className="flex flex-col justify-between rounded-xl bg-white p-4 shadow-sm transition-transform active:scale-[0.97]"
							>
								<div className="mx-auto flex items-center justify-center p-2">
									<Image
										src={`/reasons/${reason}.png`}
										alt={t(`why_us.${reason}.title`)}
										width={60}
										height={60}
										className="transition-transform duration-500 active:scale-105"
									/>
								</div>

								<div className="mt-2 flex-grow">
									<h3 className="mb-1 text-center text-sm font-semibold text-neutral-900">
										{t(`why_us.${reason}.title`)}
									</h3>
									<p className="text-center text-[13px] leading-relaxed text-neutral-600">
										{t(`why_us.${reason}.desc`)}
									</p>
								</div>
							</div>
						))}
					</div>
				) : (
					<div
						className={`
						flex gap-6
						${isRTL ? "animate-scroll-rtl" : "animate-scroll-ltr"}
						hover:[animation-play-state:paused]`}
					>
						{loopData.map((reason, i) => (
							<div key={i} className="group min-w-[200px] max-w-[200px] flex-shrink-0">
								<div className="flex h-[260px] flex-col justify-between rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
									<div className="mx-auto flex items-center justify-center p-4">
										<Image
											src={`/reasons/${reason}.png`}
											alt={t(`why_us.${reason}.title`)}
											width={70}
											height={70}
											className="transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110"
										/>
									</div>

									<div className="mt-3 flex-grow">
										<h3 className="mb-2 text-center text-base font-semibold text-neutral-900">
											{t(`why_us.${reason}.title`)}
										</h3>
										<p className="break-words text-center text-sm leading-relaxed text-neutral-600">
											{t(`why_us.${reason}.desc`)}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

// ("use client");

// import Image from "next/image";
// import { useTranslations } from "next-intl";
// import { useEffect, useRef, useState } from "react";

// export const WhyUs = ({ dir }: { dir: string }) => {
// 	const t = useTranslations("common");
// 	const isRTL = dir === "rtl";
// 	const scrollRef = useRef<HTMLDivElement | null>(null);
// 	const [isPaused, setIsPaused] = useState(false);

// 	const reasonsData = [
// 		{
// 			img: "/reasons/best-price-color.png",
// 			title: "بهترین قیمت",
// 			desc: "ارائه پایین‌ترین قیمت در بازار با حفظ بالاترین کیفیت بسته‌بندی.",
// 		},
// 		{
// 			img: "/reasons/multiple-services-color.png",
// 			title: "خدمات متعدد",
// 			desc: "از طراحی تا تولید و چاپ، همه‌چیز را به صورت یکجا برایتان انجام می‌دهیم.",
// 		},
// 		{
// 			img: "/reasons/strong-team-color.png",
// 			title: "تیم اجرایی قوی",
// 			desc: "گروهی حرفه‌ای از متخصصان حوزه چاپ و بسته‌بندی در خدمت شما.",
// 		},
// 		{
// 			img: "/reasons/fast-delivery-color.png",
// 			title: "تحویل زودتر از موعد",
// 			desc: "تعهد به زمان تحویل؛ حتی زودتر از موعد اعلام‌شده.",
// 		},
// 		{
// 			img: "/reasons/quality-guarantee-color.png",
// 			title: "ضمانت کیفیت تولید",
// 			desc: "استفاده از بهترین متریال و کنترل دقیق مراحل تولید.",
// 		},
// 		{
// 			img: "/reasons/wholesale-retail-color.png",
// 			title: "فروش عمده و خرده",
// 			desc: "سرویس ویژه برای فروش عمده شرکت‌ها و سفارشات شخصی.",
// 		},
// 		{
// 			img: "/reasons/free-consult-color.png",
// 			title: "مشاوره رایگان",
// 			desc: "پیش از سفارش، با متخصصانمان مشورت کنید و بهترین انتخاب را داشته باشید.",
// 		},
// 	];

// 	const loopData = [...reasonsData, ...reasonsData];

// 	useEffect(() => {
// 		const scrollContainer = scrollRef.current;
// 		if (!scrollContainer) return;

// 		let rafId: number;
// 		const speed = 0.8;

// 		const update = () => {
// 			const fullWidth = scrollContainer.scrollWidth / 2;
// 			if (!isPaused) {
// 				if (isRTL) {
// 					if (scrollContainer.scrollLeft <= 0) {
// 						scrollContainer.scrollLeft = fullWidth;
// 					} else {
// 						scrollContainer.scrollLeft -= speed;
// 					}
// 				} else {
// 					if (scrollContainer.scrollLeft >= fullWidth) {
// 						scrollContainer.scrollLeft = 0;
// 					} else {
// 						scrollContainer.scrollLeft += speed;
// 					}
// 				}
// 			}
// 			rafId = requestAnimationFrame(update);
// 		};

// 		if (isRTL) {
// 			scrollContainer.scrollLeft = scrollContainer.scrollWidth;
// 		}

// 		const start = setTimeout(() => {
// 			rafId = requestAnimationFrame(update);
// 		}, 300);

// 		return () => {
// 			clearTimeout(start);
// 			cancelAnimationFrame(rafId);
// 		};
// 	}, [isRTL, isPaused]);

// 	return (
// 		<section className="border-t border-neutral-200 bg-neutral-100 py-10">
// 			<div className="mx-auto max-w-7xl px-4 lg:px-8">
// 				<h2 className={`mb-8 text-center text-2xl font-bold ${isRTL ? "font-vazirmatn" : "font-sans"}`}>
// 					{t("why_buy_from_20pack")}
// 				</h2>

// 				<div
// 					ref={scrollRef}
// 					className="scrollbar-hide flex gap-6 overflow-x-scroll pb-4"
// 					dir={isRTL ? "rtl" : "ltr"}
// 					onMouseEnter={() => setIsPaused(true)}
// 					onMouseLeave={() => setIsPaused(false)}
// 				>
// 					{loopData.map((reason, i) => (
// 						<div key={i} className="group min-w-[200px] max-w-[200px] flex-shrink-0">
// 							<div className="flex h-[260px] flex-col justify-between rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
// 								<div className="mx-auto flex items-center justify-center p-4">
// 									<Image
// 										src={reason.img}
// 										alt={reason.title}
// 										width={70}
// 										height={70}
// 										className="transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110"
// 									/>
// 								</div>
// 								<div className="mt-3 flex-grow">
// 									<h3 className="mb-2 text-center text-base font-semibold text-neutral-900">
// 										{reason.title}
// 									</h3>
// 									<p className="break-words text-center text-sm leading-relaxed text-neutral-600">
// 										{reason.desc}
// 									</p>
// 								</div>
// 							</div>
// 						</div>
// 					))}
// 				</div>
// 			</div>
// 		</section>
// 	);
// };
