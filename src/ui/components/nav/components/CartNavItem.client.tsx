// src/ui/components/nav/components/CartNavItem.client.tsx
"use client";

import { ShoppingBagIcon } from "lucide-react";
import clsx from "clsx";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

interface Props {
	lineCount: number;
}

export default function CartNavItemClient({ lineCount }: Props) {
	// export default function CartNavItemClient({ lineCount }: Props) {
	return (
		<>
			<LinkWithChannel
				href="/cart"
				// channel={channel}
				// className="relative flex items-center"
				className="relative hidden items-center md:flex"
				data-testid="CartNavItem"
			>
				<ShoppingBagIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
				{lineCount > 0 ? (
					<div
						className={clsx(
							"absolute bottom-0 right-0 -mb-2 -mr-2 flex h-4 flex-col items-center justify-center rounded bg-neutral-900 text-xs font-medium text-white",
							lineCount > 9 ? "w-[3ch]" : "w-[2ch]",
						)}
					>
						{lineCount}
						<span className="sr-only">item{lineCount > 1 ? "s" : ""} in cart, view bag</span>
					</div>
				) : (
					<span className="sr-only">0 items in cart</span>
				)}
			</LinkWithChannel>

			{/* 📱 نسخه موبایل (تمام‌صفحه در منوی موبایل) */}
			<LinkWithChannel
				href="/cart"
				className="flex w-full gap-2 rounded-md border border-gray-200 px-4 py-3 text-lg font-medium text-gray-800 shadow-sm hover:bg-neutral-100 md:hidden"
				data-testid="CartNavItemMobile"
			>
				<ShoppingBagIcon className="h-6 w-6 shrink-0 text-gray-700" aria-hidden="true" />
				<span className="flex gap-1">
					<span>سبد خرید</span>
					{lineCount > 0 && (
						<span className="ml-1 rounded-full bg-neutral-900 px-2 py-0.5 text-xs text-white">
							{lineCount}
						</span>
					)}
				</span>
			</LinkWithChannel>
		</>
	);
}
