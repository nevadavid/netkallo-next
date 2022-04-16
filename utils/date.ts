const locale = {
	s: (t: number) => `${t} másodperce`,
	m: (t: number) => `${t} perce`,
	h: (t: number) => `${t} órája`,
	d: (t: number) => `${t} napja`,
	M: (t: number) => `${t} hónapja`,
	y: (t: number) => `${t} éve`,
	Y: 'tegnap',
};

function getNumberOfLastDayOfMonth(date: Date) {
	return (
		new Date(
			date.getFullYear(),
			date.getMonth() + 1,
			0,
		)
		.getDate()
	);
}

function format(date: Date) {
	return date.toISOString().substring(0, 10);
}

export function formatDistance(dirtyDate: string) {
	const date = new Date(dirtyDate.replace(/-/g, '/'));
	const time = date.getTime();
	const now = new Date().getTime();
	const diff = now - time;
	const sec = Math.floor(diff / 1000);

	if (
		sec < 60
		|| sec <= 0
	) {
		return locale.s(sec);
	}

	const mins = Math.floor(sec / 60);

	if (mins < 60) {
		return locale.m(mins);
	}

	let yesterday: Date | string = new Date();
	const today = format(date);

	yesterday.setDate(yesterday.getDate() - 1);
	yesterday = format(new Date(yesterday));

	if (yesterday === today) {
		return locale.Y;
	}

	const hours = Math.floor(mins / 60);

	if (hours < 24) {
		return locale.h(hours);
	}

	const days = Math.floor(hours / 24);
	const numberOfLastDayOfMonth = getNumberOfLastDayOfMonth(date);

	if (days < numberOfLastDayOfMonth) {
		return locale.d(days);
	}

	const months = Math.floor(days / numberOfLastDayOfMonth);

	if (months < 12) {
		return locale.M(months);
	}

	const years = Math.floor(months / 12);

	return locale.y(years);
}
