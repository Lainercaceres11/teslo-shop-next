import { Footer, Sidebar, TopMenu } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopMenu />
      <Sidebar />
      <main className="bg-gray-100 min-h-screen px-0 sm:px-5">{children}</main>
      <Footer />
    </>
  );
}
