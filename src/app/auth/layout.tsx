export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center">
      <div className="sm[350px] px-10">{children}</div>
    </main>
  );
}
