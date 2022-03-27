// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import type { Feed, Settings } from '../../types';
import { xhr } from '../../utils/xhr';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const posts = await xhr(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/posts/index?feed`) as Feed[];
	const settings = await xhr(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/settings/index`) as Settings;

	res.writeHead(200, {
		'Content-type': 'application/xml',
	});

	res.write(`<?xml version="1.0" encoding="utf-8"?>
		<rss version="2.0">
			<channel>
				<title>${settings.name}</title>
				<link>${process.env.NEXT_PUBLIC_URL}</link>
				<description>${settings.description}</description>
				<lastBuildDate>${new Date()}</lastBuildDate>
				<docs>https://validator.w3.org/feed/docs/rss2.html</docs>
				<language>hu</language>
				${posts.map(post => (
					`<item>
						<title><![CDATA[${post.title}]]></title>
						<link>${process.env.NEXT_PUBLIC_URL}/${post.link}</link>
						<guid>${process.env.NEXT_PUBLIC_URL}/${post.link}</guid>
						<pubDate>${post.pub_date}</pubDate>
					</item>`
				)).join('\n')}
			</channel>
		</rss>
	`);

	res.end();
}
