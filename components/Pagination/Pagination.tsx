import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { HTMLAttributes } from 'react';

import { cls } from '../../utils/class-name';
import Icon from '../Icon/Icon';

interface Props {
	page: number,
	max: number,
	onPrev: (page: number) => void,
	onNext: (page: number) => void,
}

function Pagination({
	page,
	max,
	className,
	onPrev,
	onNext,
}: HTMLAttributes<HTMLDivElement> & Props) {
	return (
		<div
			className={cls([
				'flex items-center justify-center text-tertiary',
				className,
			])}
		>
			{page > 1 && (
				<button
					className="p-1"
					onClick={() => onPrev(page - 1)}
				>
					<Icon
						path={mdiChevronLeft}
					></Icon>
				</button>
			)}
			{page} / {max}
			{page !== max && (
				<button
					className="p-1"
					onClick={() => onNext(page + 1)}
				>
					<Icon
						path={mdiChevronRight}
					></Icon>
				</button>
			)}
		</div>
	);
}

export default Pagination;
