// // next.config.js
// import createNextIntlPlugin from 'next-intl/plugin';

// const withNextIntl = createNextIntlPlugin(
// 	// Specify a custom path here
// 	'../src/i18n/request.ts'

// );

// /** @type {import('next').NextConfig} */
// const config = {
// 	images: {
// 		unoptimized: true,
// 		domains: [
// 			'media.20pack.ir', // اضافه به عنوان fallback سریع‌تر
// 		],
// 		remotePatterns: [
// 			{
// 				protocol: 'https',
// 				hostname: '20pack.ir',
// 				port: '',
// 				pathname: '/**',
// 			},
// 			{
// 				protocol: 'https',
// 				hostname: 'saleor.20pack.ir',
// 				port: '',
// 				pathname: '/**',
// 			},
// 			{
// 				protocol: 'https',
// 				hostname: 'media.20pack.ir',
// 				port: '',
// 				pathname: '/**',
// 			},
// 		],
// 	},
// 	experimental: {
// 		typedRoutes: false,
// 	},
// 	// used in the Dockerfile
// 	output:
// 		process.env.NEXT_OUTPUT === "standalone"
// 			? "standalone"
// 			: process.env.NEXT_OUTPUT === "export"
// 				? "export"
// 				: undefined,
// };

// export default withNextIntl(config);

// next.config.js
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const config = {
	// reactStrictMode: true,
	// swcMinify: true,

	images: {
		unoptimized: true,
		// domains: ["media.20pack.ir"],
		// Use remotePatterns instead of domains
		remotePatterns: [
			{
				protocol: "http",
				hostname: "media.20pack.ir",
				pathname: "/**",
			},
		],
	},
	// experimental: {
	// 	typedRoutes: false,
	// },

	// TypedRoutes moved from experimental to root level
	typedRoutes: false,

	// // 🧩 Enable static export safety
	// compiler: {
	// 	removeConsole: process.env.NODE_ENV === "production",
	// },

	// // Optional: Add headers for font loading
	// async headers() {
	// 	return [
	// 		{
	// 			source: "/:path*",
	// 			headers: [
	// 				{ key: "Access-Control-Allow-Origin", value: "*" },
	// 				{ key: "Access-Control-Allow-Headers", value: "Origin, X-Requested-With, Content-Type, Accept" },
	// 			],
	// 		},
	// 	];
	// },
};

export default withNextIntl(config);
