"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getPaginatedUsers = async () => {
  try {
    const session = await auth();
    if (session?.user.role !== "admin") {
      return {
        ok: false,
        message: "Debes ser un usuario administrador",
      };
    }

    const users = await prisma.user.findMany({
      orderBy: {
        name: "desc",
      },
    });

    return {
      ok: true,
      users: users,
    };
  } catch {
    return {
      ok: false,
      message: "No se pudo obtener los usuarios",
    };
  }
};
