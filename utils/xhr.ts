export async function xhr(url: string) {
	try {
		const res = await fetch(url);
		const text = await res.text();
		const data = JSON.parse(text);

		return data;
	}
	catch (err) {
		return undefined;
	}
}
