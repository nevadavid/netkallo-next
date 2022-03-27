interface Props {
	path: string,
}

function Icon({
	path,
}: Props) {
	return (
		<svg
			viewBox="0 0 24 24"
			role="presentation"
			className="w-6 h-6 fill-current"
		>
			<path
				d={path}
			></path>
		</svg>
	);
}

export default Icon;
