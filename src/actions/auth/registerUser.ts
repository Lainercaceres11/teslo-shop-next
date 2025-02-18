"use server";

import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email.toLocaleLowerCase(),
        password: bcryptjs.hashSync(password, 10),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      user: user,
      message: "Usuario registrado con exito",
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "No se puedo registrar el usuario",
    };
  }
};
