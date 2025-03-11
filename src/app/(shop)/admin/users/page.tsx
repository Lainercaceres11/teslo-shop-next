import { redirect } from "next/navigation";

import { getPaginatedUsers } from "@/actions";
import { Title } from "@/components";
import { TableUser } from "./ui/TableUser";

export default async function OrdersPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect("/");
  }

  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
        <TableUser users={users} />
      </div>
    </>
  );
}
