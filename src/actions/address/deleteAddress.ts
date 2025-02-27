import prisma from "@/lib/prisma";

export const deleteAddres = async (userId: string) => {
  try {
    await prisma.userAddress.delete({ where: { userId } });

    return true;
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo eliminar el usuario",
    };
  }
};
