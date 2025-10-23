"use client";

import { useRouter, usePathname } from "next/navigation";

type ChannelSelectProps = {
	channels: { id: string; name: string; slug: string; currencyCode: string }[];
	dir: "ltr" | "rtl";
};

export const ChannelSelect = ({ channels, dir }: ChannelSelectProps) => {
	const router = useRouter();
	const pathname = usePathname();

	const currentChannel = pathname.split("/").filter(Boolean)[0] ?? "default-channel";

	const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newChannel = e.currentTarget.value;

		document.cookie = `channel=${newChannel}; path=/; max-age=${60 * 60 * 24 * 7}`;

		document.documentElement.dir = dir;

		// if (pathname.startsWith("/default-channel") || pathname.startsWith("/en-channel")) {
		const parts = pathname.split("/").filter(Boolean);
		parts[0] = newChannel;
		const newPath = "/" + parts.join("/");
		router.push(newPath);
		// } else {
		// 	// 4️⃣ اگر در مسیر بدون channel هستیم (مثل `/checkout`) فقط refresh کن
		// 	router.refresh();
		// }
	};

	return (
		// <select
		// 	className="h-10 w-fit rounded-md border border-neutral-300 bg-transparent bg-white px-4 py-2 pr-10 text-sm  placeholder:text-neutral-500 focus:border-black focus:ring-black"
		// 	onChange={(e) => {
		// 		const newChannel = e.currentTarget.value;
		// 		return router.push(`/${newChannel}`);
		// 	}}
		// 	value={params.channel}
		// >
		// 	{channels.map((channel) => (
		// 		<option key={channel.id} value={channel.slug}>
		// 			{channel.currencyCode}
		// 		</option>
		// 	))}
		// </select>

		<select
			className="h-10 w-fit rounded-md border border-neutral-300 bg-white px-4 py-2 pr-10 text-sm text-neutral-800 placeholder:text-neutral-500 focus:border-black focus:ring-black"
			onChange={handleChange}
			value={currentChannel}
		>
			{channels.map((channel) => (
				<option key={channel.id} value={channel.slug}>
					{channel.currencyCode}
				</option>
			))}
		</select>
	);
};
