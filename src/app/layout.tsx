import type { Metadata } from "next";

import "./globals.css";
import { geistMono, geistSans } from "@/config/fonts";
import { Provider } from "@/components/provider/Provider";

export const metadata: Metadata = {
  title: {
    template: "%s Teslo |shop",
    default: "Home - Teslo |shop",
  },
  description: "Tienda virtual de los mejores productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
