import { cloneElement, MutableRefObject, ReactElement, useEffect, useRef } from 'react';

interface Props {
	children: ReactElement;
	onClickOutside: () => void,
}

function setRef<T>(ref: MutableRefObject<T>, value: T) {
	ref.current = value;
}

function ClickOutside({
	children,
	onClickOutside,
}: Props) {
	const childRef = useRef<Element>(null);

	function handleClickOutside(event: MouseEvent | TouchEvent) {
		if (
			childRef.current
			&& event.target
			&& !childRef.current.contains(event.target as Node)
		) {
			onClickOutside();
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});

	return (
		<>
			{cloneElement(children, {
				ref: (ref: any) => setRef(childRef, ref),
			})}
		</>
	);
}

export default ClickOutside;
