/** @type {import('next').NextConfig} */
const nextConfig = {
	devIndicators: {
		buildActivity: false,
	},
	images: {
		domains: [
			'0.0.0.0',
			'localhost',
			'netkallo.hu',
			'netkallo.nagykalloihirek.hu',
			'szon.hu',
			'cdn.szon.hu',
			'https://szon.hu',
			'https://cdn.szon.hu',
			'https://www.szon.hu',
			'https://www.cdn.szon.hu',
			'cloudflare.com',
			'nagykallo.hu',
			'kolcseytv.hu',
			'www.koranyigimi.hu',
			'static.civishir.hu',
			'live.staticflickr.com',
			'szabolcsihir.hu',
		],
	},
	reactStrictMode: true,
};

module.exports = nextConfig;
