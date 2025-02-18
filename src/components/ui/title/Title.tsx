import { titleFont } from "@/config/fonts";

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}
export const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div className={`mt-3 ${className}`}>
      <h1
        className={`${className} m-3 ${titleFont.className} antialiased font-semibold text-4xl my-10`}
      >
        {title}
      </h1>

      {subtitle && <h3 className="text-xl mb-5">{subtitle}</h3>}
    </div>
  );
};
