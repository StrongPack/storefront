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
	images: {
		unoptimized: true,
		domains: ["media.20pack.ir"],
	},
	experimental: {
		typedRoutes: false,
	},
};

export default withNextIntl(config);
