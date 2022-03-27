import { ReactNode, HTMLAttributes } from 'react';

import { cls } from '../../utils/class-name';

interface Props {
	children: ReactNode,
}

function Container({
	children,
	...rest
}: HTMLAttributes<HTMLDivElement> & Props) {
	return (
		<div
			{...rest}
			className={cls([
				'w-full max-w-3xl px-3 mx-auto',
				rest.className
			])}
		>
			{children}
		</div>
	);
}

export default Container;
