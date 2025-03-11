import Image from "next/image";

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  width: number;
  height: number;
  styles?: React.CSSProperties;
}

export const ProductImage = ({
  src,
  alt,
  className,
  width,
  height,
  styles,
}: Props) => {
  const localSrc = src
    ? src.startsWith("http")
      ? src
      : `/products/${src}`
    : "/imgs/placeholder.jpg";
  return (
    <Image
      style={styles}
      alt={alt}
      src={localSrc}
      className={className}
      width={width}
      height={height}
    />
  );
};
