import Link from 'next/link';
import { useState } from 'react';

import type { Post } from '../../types';
import { xhr } from '../../utils/xhr';

interface Props {
	url: string,
}

function Search({
	url,
}: Props) {
	const [results, setResults] = useState([] as Post[]);

	return (
		<form
			className="relative w-full pb-3"
		>
			<input
				className="w-full py-2 px-3 rounded text-black border-2 border-white focus:border-gray-200 focus:outline-none"
				type="search"
				placeholder="Keresés"
				autoFocus
				onChange={async (event) => {
					const { value } = event.target;

					if (value) {
						const res = await xhr(`${url}${event.target.value}`);

						setResults(res);
					}
					else {
						setResults([]);
					}
				}}
			></input>
			{results.length > 0 && (
				<ul
					className="absolute w-full max-h-96 bg-white shadow divide-y overflow-y-auto"
				>
					{results.map(({ title, slug }, i) => {
						if (title) {
							return (
								<li
									key={i}
								>
									<Link
										href={`/${slug}`}
									>
										<a
											className="block max-w-full p-3 truncate hover:bg-gray-100"
											dangerouslySetInnerHTML={{
												__html: title,
											}}
										></a>
									</Link>
								</li>
							);
						}
					})}
				</ul>
			)}
		</form>
	);
}

export default Search;
