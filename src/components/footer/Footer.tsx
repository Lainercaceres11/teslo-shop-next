import { titleFont } from "@/config/fonts";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="flex items-center justify-center w-full mt-10 text-xs gap-5 mb-10">
      <Link href="/">
        <span className={`${titleFont.className} antialiased font-bold `}>
          Teslo
        </span>
        <span>| Shop</span>
        <span>{new Date().getFullYear()}</span>
      </Link>

      <Link href="/">
        <span>Privacidad y condiciones</span>
      </Link>

      <Link href="/">
        <span>Ubicaciones</span>
      </Link>
    </footer>
  );
};
