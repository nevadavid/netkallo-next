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
			'cdn.szon.hu',
			'nagykallo.hu',
			'kolcseytv.hu',
			'www.koranyigimi.hu',
			'static.civishir.hu',
			'live.staticflickr.com',
		],
	},
	reactStrictMode: true,
};

module.exports = nextConfig;
