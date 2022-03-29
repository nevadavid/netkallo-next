import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState } from 'react';

import Layout from '../components/Layout/Layout';
import '../styles/globals.css';

import type { Settings } from '../types';
import { xhr } from '../utils/xhr';

function MyApp({
	Component,
	pageProps,
}: AppProps) {
	const { name, description, footer } = pageProps.settings as Settings;

	useEffect(() => {
		window.ga = window.ga || function() {
			(window.ga.q = window.ga.q || []).push(arguments)
		};
		window.ga.l = +new Date;
		window.ga('create', process.env.NEXT_PUBLIC_GA, 'auto');
		window.ga('send', 'pageview');
	}, []);

	return (
		<>
			<Head>
				<title>
					{name}
				</title>
				<meta
					property="og:type"
					content="website"
				/>
				<meta
					property="og:title"
					content={name}
				/>
				<meta
					property="og:description"
					content={description}
				/>
				<meta
					property="og:image"
					content={`${process.env.NEXT_PUBLIC_URL}/netkallo-promo.png`}
					key="og:image"
				/>
				<meta
					property="fb:app_id"
					content="443573866964646"
				/>
				<meta
					property="description"
					content={description}
				/>
				<meta
					name="msapplication-TileColor"
					content="#045690"
				/>
				<meta
					name="theme-color"
					content="#045690"
				/>
				<link
					rel="icon"
					type="image/x-icon"
					href="/favicon.ico"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="mask-icon"
					color="#045690"
					href="/safari-pinned-tab.svg"
				/>
				<link
					rel="manifest"
					href="/site.webmanifest"
				/>
			</Head>
			<Script
				src="https://www.google-analytics.com/analytics.js"
				async
			></Script>
			<Layout
				{...pageProps}
				url={`${process.env.NEXT_PUBLIC_API_URL}/wp-json/posts/index?q=`}
				footer={footer}
			>
				<Component
					{...pageProps}
				></Component>
			</Layout>
		</>
	);
}

MyApp.getInitialProps = async () => {
	if (
		typeof window === 'undefined'
		|| !window?.__NEXT_DATA__?.props?.pageProps
	) {
		const settings = await xhr(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/settings/index`) as Settings;

		return {
			pageProps: {
				settings,
			},
		};
	}

	return {
		pageProps: window?.__NEXT_DATA__?.props?.pageProps as { settings: Settings},
	};
}

export default MyApp;
