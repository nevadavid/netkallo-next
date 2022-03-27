import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import type { Settings } from '../types';

const Custom404: NextPage<{ settings: Settings }> = ({
	settings,
}) => {
	return (
		<>
			<Head>
				<title>
					404 - Az oldal nem található. | {settings.name}
				</title>
			</Head>
			<h1
				className="pt-3 text-6xl font-bold"
			>
				404
			</h1>
			<h2>
				Az oldal nem található.
			</h2>
			<Link
				href="/"
			>
				<a
					className="text-primary"
				>
					Vissza a főoldalra
				</a>
			</Link>
		</>
	);
}

export default Custom404;
