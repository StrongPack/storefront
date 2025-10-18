"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { type ComponentProps } from "react";

export const LinkWithChannel = ({
	href,
	...props
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) => {
	// const { channel } = useParams<{ channel?: string }>();

	const { channel, locale } = useParams<{ channel?: string; locale?: string }>();

	if (!href.startsWith("/")) {
		return <Link {...props} href={href} />;
	}

	// const encodedChannel = encodeURIComponent(channel ?? "");
	// const hrefWithChannel = `/${encodedChannel}${href}`;
	// return <Link {...props} href={hrefWithChannel} />;

	// اگر channel و locale وجود داشته باشد، در مسیر بساز
	const encodedChannel = encodeURIComponent(channel ?? "");
	const encodedLocale = encodeURIComponent(locale ?? "");
	const hrefWithChannel = `/${encodedChannel}/${encodedLocale}${href}`; // ✅ حالا هر دو را اضافه می‌کنیم

	return <Link {...props} href={hrefWithChannel} />;
};
