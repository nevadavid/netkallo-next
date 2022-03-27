import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';

import type { Settings, Post } from '../types';
import { xhr } from '../utils/xhr';
import PostItem from '../components/PostItem/PostItem';

const Home: NextPage<{ posts: Post[], settings: Settings }> = ({
	posts,
	settings,
}) => {
	return (
		<>
			<Head>
				<title>
					{settings.name}
				</title>
			</Head>
			<div
				className="space-y-3"
			>
				{posts.map((post, i) => (
					<PostItem
						key={i}
						{...post}
					></PostItem>
				))}
			</div>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	let url = `${process.env.NEXT_PUBLIC_API_URL}/wp-json/posts/index`;

	const data = await xhr(url) as Post[];

	return {
		props: {
			posts: data.map((post, i) => ({
				...post,
				featured: (
					i === 0
					&& !!post.image
				),
			})),
		},
	};
};

export default Home;
