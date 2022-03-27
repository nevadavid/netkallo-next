import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Pagination from '../../components/Pagination/Pagination';
import PostItem from '../../components/PostItem/PostItem';
import type { Settings, TagResponse } from '../../types';
import { xhr } from '../../utils/xhr';

const Tag: NextPage<TagResponse & { settings: Settings }> = ({
	name,
	pages,
	posts,
	settings,
}) => {
	const title = `${name} - ${settings.name}`;
	const router = useRouter();
	let { page } = router.query;

	function onChange(event: number) {
		router.push({
			pathname: router.pathname,
			query: {
				...router.query,
				page: event,
			},
		})
	}

	if (Array.isArray(page)) {
		(page as unknown as number) = +page[0];
	}

	if (page) {
		(page as unknown as number) = +page;
	}

	return (
		<>
			<Head>
				<title>
					{title}
				</title>
				<meta
					property="og:title"
					content={title}
				></meta>
			</Head>
			<h1
				className="text-2xl pt-3 font-bold"
			>
				{name}
			</h1>
			{(posts && Array.isArray(posts)) && (
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
			)}
			{pages > 1 && (
				<Pagination
					page={page as unknown as number || 1}
					max={pages + 1}
					className="mt-6"
					onPrev={(event) => onChange(event)}
					onNext={(event) => onChange(event)}
				></Pagination>
			)}
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { params, query } = context;
	let url = `${process.env.NEXT_PUBLIC_API_URL}/wp-json/posts/index?tag=${params?.slug}`;

	if (query.page) {
		url += `&page=${query.page}`;
	}

	const data = await xhr(url);

	if (data.length === 0) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			...data,
		},
	};
};

export default Tag;
