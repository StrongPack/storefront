"use client";

import Link from "next/link";
import { useRouter } from "next/router";

export const LanguageSwitcher = () => {
	const { pathname, query, asPath } = useRouter();

	return (
		<div>
			<Link href={{ pathname, query }} as={asPath} locale="en">
				English
			</Link>
			<Link href={{ pathname, query }} as={asPath} locale="fa">
				فارسی
			</Link>
		</div>
	);
};
