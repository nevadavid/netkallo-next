// const keywords = [
// 	'nagykálló',
// 	'Nagykálló',
// 	'nagykallo',
// 	'Nagykallo',
// 	'kiskálló',
// 	'Kiskálló',
// 	'kiskallo',
// 	'Kiskallo',
// 	'harangod',
// 	'Harangod',
// ];

// export function transformContent(content: string) {
// 	const div = document.createElement('div');

// 	div.innerHTML = content;

// 	const els = div.getElementsByTagName('*');
// 	const links = div.querySelectorAll('a');
// 	const imgs = div.querySelectorAll('img');

// 	for (const link of links) {
// 		link.setAttribute('target', '_blank');
// 	}

// 	for (const img of imgs) {
// 		const src = img.getAttribute('src');

// 		img.setAttribute(
// 			'src',
// 			`${process.env.NEXT_PUBLIC_API_URL}/index.image.php?url=${src}`,
// 		);
// 		img.removeAttribute('srcset');
// 	}

// 	for (const el of els) {
// 		for (const keyword of keywords) {
// 			if (el.textContent?.includes(keyword)) {
// 				el.innerHTML = el.textContent?.replaceAll(
// 					keyword,
// 					`<mark>${keyword}</mark>`,
// 				);
// 			}
// 		}
// 	}

// 	return div.innerHTML;
// }


const keywords = [
	'nagykálló',
	'nagykállói',
	'Nagykálló',
	'Nagykállói',
	'nagykallo',
	'nagykalloi',
	'Nagykallo',
	'Nagykalloi',
	'kiskálló',
	'kiskállói',
	'Kiskálló',
	'Kiskállói',
	'kiskallo',
	'kiskalloi',
	'Kiskallo',
	'Kiskalli',
	'kálló',
	'kállói',
	'Kálló',
	'Kállói',
	'kallo',
	'kalloi',
	'Kallo',
	'Kalloi',
	'harangod',
	'harangodi',
	'Harangod',
	'Harangodi',
];

function highlight(string: string) {
	for (const keyword of keywords) {
		const regexp = new RegExp('\\b' + keyword + '(\\s)', 'g');
		const tag = `<mark>${keyword}</mark>$1`;

		string = string.replace(regexp, tag);
	}

	return string;
}

function targetBlank(string: string) {
	const regexp = new RegExp(/<(a)([^>]+)>/g)

	string = string.replace(regexp, '<$1 target="_blank"$2 rel="noreferrer">');

	return string;
}

function removeSrcset(string: string) {
	const regexp = new RegExp(/srcset=".*"/g);

	return string.replace(regexp, '');
}

function transformImage(string: string) {
	const regexp = new RegExp(/(<img [^>]*src=")(.*")(.*?)/g);

	string = string.replace(regexp, '$1' + `${process.env.NEXT_PUBLIC_API_URL}/index.image.php` + '?url=$2' + '$3');

	return string;
}

export function transformContent(string: string) {
	if (!string) {
		return '';
	}

	string = highlight(string);
	string = targetBlank(string);
	string = removeSrcset(string);
	string = transformImage(string);

	return string;
}
