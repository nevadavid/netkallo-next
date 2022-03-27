export function cls(...args: any) {
	const classes: string[] = [];

	for (const arg of args) {
		const argType = typeof arg;

		if (
			argType === 'number'
			|| argType === 'string'
		) {
			classes.push(`${arg}`);
		}
		else if (Array.isArray(arg)) {
			if (arg.length) {
				for (const val of arg) {
					if (val) {
						const item = cls(val);

						classes.push(item);
					}
				}
			}
		}
		else if (argType === 'object') {
			for (const key in arg) {
				if (arg[key]) {
					classes.push(key);
				}
			}
		}
	}

	return classes.join(' ');
}
