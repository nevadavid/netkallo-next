import type { NextApiResponse } from 'next';

import type { Sitemap } from '../types';
import { xhr } from '../utils/xhr';

function Sitemap() {
	return null;
}

export const getServerSideProps = async ({ res }: { res: NextApiResponse }) => {
	const posts = await xhr(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/posts/index?all`) as Sitemap[];

	res.writeHead(200, {
		'Content-type': 'application/xml',
	});

	res.write(`
		<urlset
			xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
			xmlns:xhtml="http://www.w3.org/1999/xhtml"
			xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
		>
			${posts.map(post => (
				`<url>
					<loc>${post.url}</loc>
					<lastmod>${post.date}</lastmod>
					<changefreq>daily</changefreq>
					<priority>1.0</priority>
				</url>`
			)).join('\n')}
		</urlset>
	`);

	res.end();

	return {
		props: {},
	};
}

export default Sitemap;
