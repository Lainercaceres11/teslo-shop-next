import { auth } from "@/auth.config";
import { Title } from "@/components";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <article className="flex flex-col justify-center items-center gap-2">
      <Title title="Perfil" />
      <div className="text-start flex flex-col gap-2">
        <p>
          <strong>Nombre</strong>: {session.user.name}
        </p>
        <p>
          <strong>Email</strong>: {session.user.email}
        </p>
        <p>
          <strong>Rol</strong>: {session.user.role}
        </p>
      </div>

      <Image
        src="/imgs/user-profile.webp"
        alt="User Profile."
        width={200}
        height={200}
      />
    </article>
  );
}
