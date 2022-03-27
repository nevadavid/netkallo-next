import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

import type { Settings } from '../types';

class CustomDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		let pageProps = {};
		const originalRenderPage = ctx.renderPage;

		// Run the React rendering logic synchronously
		ctx.renderPage = () => originalRenderPage({

			// Useful for wrapping the whole react tree
			enhanceApp: (App) => function enchancedApp(props) {
				pageProps = props.pageProps;

				return <App {...props} />
			},

			// Useful for wrapping in a per-page basis
			enhanceComponent: (Component) => Component,
		});

		// Run the parent `getInitialProps`, it now includes the custom `renderPage`
		const initialProps = await Document.getInitialProps(ctx);

		return { ...initialProps, ...pageProps };
	}

	render() {
		const { language } = (this.props as any).settings as Settings;

		return (
			<Html
				lang={language}
			>
				<Head>
					<link
						rel="preconnect"
						href="https://fonts.googleapis.com"
					></link>
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin=''
					></link>
					<link
						href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
						rel="stylesheet"
					></link>
				</Head>
				<body
					className="font-inter"
				>
					<Main></Main>
					<NextScript></NextScript>
				</body>
			</Html>
		);
	}
}

export default CustomDocument;
