import NextImage, { ImageProps } from 'next/image';

interface Props extends ImageProps {
	src: string,
	alt: string,
	className: string,
}

function Image({
	src,
	width,
	height,
	alt,
	className,
	...rest
}: Props) {
	const nativeImage = (
		typeof src === 'string'
		&& src.includes('szon.hu')
	);

	src = (
		!nativeImage
		? `${process.env.NEXT_PUBLIC_API_URL}/index.image.php?url=${src}`
		: src
	);

	if (nativeImage) {
		return (
			<img
				src={src}
				width={width}
				height={height}
				alt={alt}
				className={className}
			/>
		);
	}

	return (
		<NextImage
			src={src}
			width={width}
			height={height}
			alt={alt}
			className={className}
			{...rest}
		></NextImage>
	);
}

export default Image;
