declare global {
	interface Window {
		ga: any,
	}
}

window.ga = window.ga || {};

export interface Settings {
	admin_email: string,
	charset: string,
	description: string,
	facebook_page_url: string,
	footer: string,
	language: string,
	name: string,
	rss2_url: string,
	api_url: string,
}

export interface Tag {
	name: string,
	slug: string,
}

export interface Post {
	date: string,
	image?: string,
	slug: string,
	tags?: Tag,
	title: string,
}

export interface TagResponse {
	name: string,
	pages: number,
	posts: Post[],
}

export interface PostResponse extends Omit<Post, 'tags'> {
	content: string,
	excerpt?: string,
	posts: {
		label: string,
		value: Post[],
	},
	source_title: string,
	source_url: string,
	tags?: Tag[],
	type: string,
}

export interface Feed {
	title: string,
	link: string,
	author: string,
	pub_date: string,
	guid: string,
	description: string,
}

export interface Sitemap {
	url: string,
	date: string,
}
