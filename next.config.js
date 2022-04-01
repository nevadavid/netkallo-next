/** @type {import('next').NextConfig} */
const nextConfig = {
	devIndicators: {
		buildActivity: false,
	},
	experimental: {
		scrollRestoration: true,
	},
	images: {
		domains: [
			'0.0.0.0',
			'localhost',
			'netkallo.hu',
			'netkallo.nagykalloihirek.hu',
		],
	},
	reactStrictMode: true,
};

module.exports = nextConfig;
