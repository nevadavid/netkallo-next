import Link from 'next/link';

import type { Post } from '../../types';
import { cls } from '../../utils/class-name';
import { formatDistance } from '../../utils/date';
import Image from '../Image/Image';

interface Props extends Post {
	featured?: boolean,
}

function PostItem({
	featured,
	title,
	tags,
	date,
	image,
	slug,
}: Props) {
	const now = new Date().toISOString();
	const dateDist = formatDistance(date || now);

	return (
		<Link
			href={`/${slug}`}
		>
			<a
				className={cls([
					'relative flex items-start justify-between hover:text-primary',
					{
						'md:min-h-32 space-x-3 pt-3': !featured,
						'-mx-3 md:mx-0': featured,
					},
				])}
			>
				{(title || tags || date) && (
					<div
						className={cls(
							'min-w-0 z-10',
							{
								'absolute bottom-0 w-full px-3 pb-3 pt-12 bg-gradient-to-b from-transparent to-black': featured,
							},
						)}
					>
						{(tags || date) && (
							<div
								className={cls([
									'flex my-1 text-xs',
									{
										'text-tertiary': !featured,
										'text-white': featured,
									},
								])}
							>
								{tags && (
									<>
										<div
											className="min-w-0"
										>
											<div
												className="truncate capitalize font-bold text-secondary"
											>
												{tags.name}
											</div>
										</div>
										<div
											className="flex-none mx-0.5"
										>
											&#183;
										</div>
									</>
								)}
								<div
									className="flex-none"
								>
									{dateDist}
								</div>
							</div>
						)}
						<div
							className={cls([
								'font-bold leading-tight',
								{
									'text-white': featured,
								},
							])}
							dangerouslySetInnerHTML={{
								__html: title,
							}}
						></div>
					</div>
				)}
				{image && (
					<div
						className={cls([
							'flex-none flex justify-center overflow-hidden bg-gray-100',
							{
								'w-20 md:w-32 aspect-square': !featured,
								'w-full aspect-video': featured,
							},
						])}
					>
						<Image
							src={image}
							width={featured ? 744 : 200}
							height={featured ? 418 : 200}
							alt={title}
							className="object-cover"
						></Image>
					</div>
				)}
			</a>
		</Link>
	);
}

export default PostItem;
