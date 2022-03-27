import { ReactNode } from 'react';

import Container from '../Container/Container';
import Navbar from '../Navbar/Navbar';
import Search from '../Search/Search';

interface Props {
	name: string,
	url: string,
	children: ReactNode,
	footer: string,
}

function Layout({
	name,
	url,
	footer,
	children,
}: Props) {
	return (
		<>
			<Navbar
				title={name}
				bottom={
					<Search
						url={url}
					></Search>
				}
			></Navbar>
			<Container
				className="my-12"
			>
				{children}
			</Container>
			<Container>
				<div
					className="py-6 text-center text-tertiary text-xs"
					dangerouslySetInnerHTML={{
						__html: footer,
					}}
				></div>
			</Container>
		</>
	);
}

export default Layout;
