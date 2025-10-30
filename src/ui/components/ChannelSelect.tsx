"use client";
import { useRouter, usePathname } from "next/navigation";
import { type LanguageCodeEnum } from "@/gql/graphql";

type ChannelSelectProps = {
	channels: {
		id: string;
		slug: string;
		name: string;
		flag: string;
		dir: "ltr" | "rtl";
		locale: string;
		languageCode: LanguageCodeEnum;
		displayname: string;
	}[];
	variant?: "footer" | "navbar" | "navbar-mobile";
};

export const ChannelSelect = ({ channels, variant = "footer" }: ChannelSelectProps) => {
	const router = useRouter();
	const pathname = usePathname();

	const currentChannel = pathname.split("/").filter(Boolean)[0] ?? "default-channel";

	const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newChannel = e.currentTarget.value;

		const newDir = channels.find((ch) => ch.slug === newChannel)?.dir || "ltr";

		document.cookie = `channel=${newChannel}; path=/; max-age=${60 * 60 * 24 * 7}`;
		document.documentElement.dir = newDir;

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

	let baseClass =
		"h-10 w-fit rounded-md border border-neutral-300 bg-white px-4 py-2 pr-10 text-sm text-neutral-800 focus:border-black focus:ring-black transition";

	if (variant == "navbar") {
		baseClass =
			"h-10 w-fit rounded-md border border-neutral-300 bg-white text-base text-center items-center justify-center  flex focus:border-black focus:ring-black";
	}

	if (variant == "navbar-mobile") {
		baseClass =
			"w-full rounded-md border border-neutral-300 bg-white text-lg py-3 font-medium text-neutral-800 flex  justify-center items-center shadow-sm focus:border-black focus:ring-black";
	}

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

		// <select
		// 	className="h-10 w-fit rounded-md border border-neutral-300 bg-white px-4 py-2 pr-10 text-sm text-neutral-800 placeholder:text-neutral-500 focus:border-black focus:ring-black"
		// 	onChange={handleChange}
		// 	value={currentChannel}
		// >
		// 	{channels.map((channel) => (
		// 		<option key={channel.id} value={channel.slug}>
		// 			{channel.flag} {channel.displayname}
		// 		</option>
		// 	))}
		// </select>

		<select className={baseClass} onChange={handleChange} value={currentChannel}>
			{channels.map((channel) => {
				let optionText = "";

				// if (variant === "navbar-mobile") {
				//}
				if (variant == "navbar") {
					optionText = `${channel.flag}`;
				} else {
					optionText = `${channel.flag} ${channel.displayname}`;
				}
				return (
					<option key={channel.id} value={channel.slug} dir={channel.dir}>
						{optionText}
					</option>
				);
			})}
		</select>
	);
};
