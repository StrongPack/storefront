import Image from "next/image";

export const FooterSocial = () => (
	<div className="mb-5 flex items-center gap-6 sm:mb-0">
		{[
			{ href: "tel:+989011443374", icon: "/icons/phone-solid-full.svg", alt: "Phone", glow: "#007AFF" },
			{
				href: "https://wa.me/989011443374",
				icon: "/icons/whatsapp-brands-solid-full.svg",
				alt: "WhatsApp",
				glow: "#25D366",
			},
			{
				href: "https://www.instagram.com/20pack.ir",
				icon: "/icons/instagram-brands-solid-full.svg",
				alt: "Instagram",
				glow: "#E1306C",
			},
			// {
			// 	href: "https://t.me/yourchannel",
			// 	icon: "/icons/telegram-brands-solid-full.svg",
			// 	alt: "Telegram",
			// 	glow: "#E1306C",
			// },
		].map(({ href, icon, alt, glow }) => (
			<a
				key={alt}
				href={href}
				target={href.startsWith("http") ? "_blank" : undefined}
				rel="noopener noreferrer"
				aria-label={alt}
				className="transition-all duration-300 hover:-translate-y-1 hover:scale-110"
			>
				<Image
					src={icon}
					alt={alt}
					width={28}
					height={28}
					className={`transition duration-200 hover:brightness-0 hover:drop-shadow-[0_0_6px_${glow}] hover:invert`}
				/>
			</a>
		))}
	</div>
);
