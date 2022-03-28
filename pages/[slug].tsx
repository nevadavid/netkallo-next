import { useEffect } from 'react';
import { render } from 'react-dom';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import type { NextPage, GetServerSideProps } from 'next';

import { xhr } from '../utils/xhr';
import type { PostResponse, Settings } from '../types';
import { formatDistance } from '../utils/date';
import PostItem from '../components/PostItem/PostItem';
import { transformContent } from '../utils/dom';

const Post: NextPage<PostResponse & { settings: Settings }> = ({
	title,
	image,
	date,
	tags,
	excerpt,
	content,
	posts,
	source_title,
	source_url,
	settings,
}) => {
	const { asPath } = useRouter();
	const metaTitle = `${title} - ${settings.name}`;
	const url = `${process.env.NEXT_PUBLIC_URL}${asPath}`;

	useEffect(() => {
		render(
			<div
				dangerouslySetInnerHTML={{
					__html: transformContent(content),
				}}
			></div>,
			document.getElementById('content'),
		);
	}, [content]);

	return (
		<>
			<Head>
				<title>
					{metaTitle}
				</title>
				<meta
					property="og:type"
					content="article"
				/>
				<meta
					property="og:url"
					content={url}
				/>
				<meta
					property="og:title"
					content={metaTitle}
				/>
				{excerpt && (
					<>
						<meta
							name="description"
							content={excerpt}
						/>
						<meta
							name="og:description"
							content={excerpt}
						/>
					</>
				)}
				{image && (
					<meta
						property="og:image"
						content={image}
						key="og:image"
					/>
				)}
			</Head>
			<article>
				<h1
					className="text-2xl pt-3 font-bold"
					dangerouslySetInnerHTML={{
						__html: title,
					}}
				></h1>
				{(source_title || date) && (
					<div
						className="mb-3 text-xs text-tertiary"
					>
						{date && (
							<span
								title={date}
							>
								{formatDistance(date)}
							</span>
						)}
						{source_url && (
							<>
								{' '} &#183; Forrás: {' '}
								<a
									href={source_url}
									title={source_title || source_url}
									className="underline"
									target="_blank"
									rel="noreferrer"
								>
									{source_title || source_url}
								</a>
							</>
						)}
					</div>
				)}
				{image && (
					<div
						className="relative flex w-full aspect-video mb-3 bg-gray-100"
					>
						<Image
							src={image}
							alt={title}
							layout="fill"
							className="object-cover"
							priority
						></Image>
					</div>
				)}
				{content && (
					<div
						id="content"
					></div>
				)}
				{tags?.length && (
					<div
						className="my-2 space-y-2"
					>
						{tags.map((tag, i) => (
							<Link
								key={i}
								href={`/cimke/${tag.slug}`}
							>
								<a
									className="inline-block mr-2 py-1 px-1.5 uppercase text-gray-600 text-xs rounded bg-gray-200"
								>
									#{tag.name}
								</a>
							</Link>
						))}
					</div>
				)}
				{url && (
					<iframe
						src={`https://www.facebook.com/plugins/share_button.php?href=${url}%2F&layout=button_count&size=small&appId=443573866964646`}
						className="mt-3 mb-6"
						height="20"
						scrolling="no"
						allow="autoplay; clipboard-write; encrypted-media; picture-in-picture;"
						allowFullScreen
					></iframe>
				)}
				{posts.value.length && (
					<>
						<div
							className="flex items-stretch"
						>
							<div
								className="w-full py-1 px-3 font-bold text-white bg-gradient-to-r from-primary to-secondary"
							>
								{posts.label}
							</div>
						</div>
						<>
							{posts.value.map((post, i) => (
								<PostItem
									key={i}
									{...post}
								></PostItem>
							))}
						</>
					</>
				)}
			</article>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { params } = context;
	let url = `${process.env.NEXT_PUBLIC_API_URL}/wp-json/posts/index?slug=${params?.slug}`;

	const data: PostResponse = await xhr(url);

	if (!data) {
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

export default Post;
