import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { mdiFacebook, mdiMagnify } from '@mdi/js';

import Container from '../Container/Container';
import Icon from '../Icon/Icon';
import Logo from '../Logo/Logo';

interface Props {
	title: string,
	bottom?: ReactNode,
}

function Navbar({
	title,
	bottom,
}: Props) {
	const [openBottom, setOpenBottom] = useState(false);

	return (
		<div
			className="fixed w-full top-0 shadow bg-primary z-20"
		>
			<Container
				className="flex justify-between items-center py-3 space-x-3 text-white"
			>
				<Link
					href="/"
				>
					<a
						aria-label="Logó"
					>
						<Logo></Logo>
					</a>
				</Link>
				<div
					className="flex items-center space-x-3 text-white"
				>
					<button
						aria-label="Keresés"
						onClick={() => setOpenBottom(!openBottom)}
					>
						<Icon
							path={mdiMagnify}
						></Icon>
					</button>
					<a
						href={process.env.NEXT_PUBLIC_FB_PAGE_URL}
						title={title}
						target="_blank"
						aria-label="Facebook"
						rel="noopener noreferrer"
					>
						<Icon
							path={mdiFacebook}
						></Icon>
					</a>
				</div>
			</Container>
			{openBottom && (
				<Container>
					{bottom}
				</Container>
			)}
		</div>
	);
}

export default Navbar;
