"use client";

import { Fragment, type ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Logo } from "../../Logo";
import { useMobileMenu } from "./useMobileMenu";
import { OpenButton } from "./OpenButton";
import { CloseButton } from "./CloseButton";

type Props = {
	children: ReactNode;
	locale?: string;
};

export const MobileMenu = ({ children, locale }: Props) => {
	const { closeMenu, openMenu, isOpen } = useMobileMenu();
	const isRTL = locale === "fa";

	return (
		<>
			<OpenButton onClick={openMenu} aria-controls="mobile-menu" />
			<Transition show={isOpen}>
				<Dialog onClose={closeMenu}>
					{/* <Dialog.Panel className="fixed inset-0 z-20 flex h-dvh w-screen flex-col overflow-y-scroll"> */}
					<Dialog.Panel
						dir={isRTL ? "rtl" : "ltr"}
						className={clsx(
							"fixed inset-0 z-50 flex h-dvh w-screen flex-col overflow-y-auto bg-white/95 backdrop-blur-md",
							"shadow-xl",
						)}
					>
						{/* <Transition.Child
							className="sticky top-0 z-10 flex h-16 shrink-0 bg-neutral-100/50 px-3 backdrop-blur-md sm:px-8"
							enter="motion-safe:transition-all motion-safe:duration-150"
							enterFrom="bg-transparent"
							enterTo="bg-neutral-100"
							leave="motion-safe:transition-all motion-safe:duration-150"
							leaveFrom="bg-neutral-100"
							leaveTo="bg-transparent"
						> */}

						<Transition.Child
							enter="transition-all duration-150"
							enterFrom="opacity-0 -translate-y-3"
							enterTo="opacity-100 translate-y-0"
							leave="transition-all duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 -translate-y-3"
							as={Fragment}
						>
							<div
								className={clsx(
									"sticky top-0 z-10 flex h-20 shrink-0 items-center border-b border-neutral-200 px-4",
									isRTL ? "flex-row-reverse" : "flex-row",
								)}
							>
								{isRTL ? (
									<>
										<CloseButton onClick={closeMenu} aria-controls="mobile-menu" rtl={isRTL} />
										<Logo />
									</>
								) : (
									<>
										<Logo />
										<CloseButton onClick={closeMenu} aria-controls="mobile-menu" rtl={isRTL} />
									</>
								)}
							</div>
						</Transition.Child>
						{/* <Transition.Child
							as={Fragment}
							enter="motion-safe:transition-all motion-safe:duration-150"
							enterFrom="opacity-0 -translate-y-3 bg-transparent"
							enterTo="opacity-100 translate-y-0 bg-white"
							leave="motion-safe:transition-all motion-safe:duration-150"
							leaveFrom="opacity-100 translate-y-0 bg-white"
							leaveTo="opacity-0 -translate-y-3 bg-transparent"
						> */}

						{/* <ul
								className="flex h-full flex-col divide-y divide-neutral-200 whitespace-nowrap p-3 pt-0 sm:p-8 sm:pt-0 [&>li]:py-3"
								id="mobile-menu"
							>
								{children}
							</ul> */}

						<Transition.Child
							as={Fragment}
							enter="transition-all duration-150"
							enterFrom="opacity-0 translate-y-3"
							enterTo="opacity-100 translate-y-0"
							leave="transition-all duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-3"
						>
							<div id="mobile-menu" className="flex flex-col gap-4 p-6 text-base font-medium text-gray-800">
								{children}
							</div>
						</Transition.Child>
					</Dialog.Panel>
				</Dialog>
			</Transition>
		</>
	);
};
