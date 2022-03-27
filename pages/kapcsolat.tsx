import { NextPage } from 'next';
import Head from 'next/head';

import type { Settings } from '../types';

const Contact: NextPage<{ settings: Settings }> = ({
	settings,
}) => {
	return (
		<>
			<Head>
				<title>
					Kapcsolat | {settings.name}
				</title>
			</Head>
			<h1
				className="text-2xl pt-3 font-bold"
			>
				{settings.name} - {settings.description}
			</h1>
			<ul
				className="pl-6 list-disc"
			>
				<li>
					<a
						href={settings.facebook_page_url}
						className="hover:text-primary"
						target="_blank"
						rel="noopener noreferrer"
					>
						Facebook
					</a>
				</li>
				<li>
					<a
						href={`mailto:${settings.admin_email}`}
						className="hover:text-primary"
					>
						Email
					</a>
				</li>
			</ul>
		</>
	);
};

export default Contact;
