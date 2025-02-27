import prisma from "@/lib/prisma";

export const getAdressInfo = async (userId: string) => {
  try {
    const userAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    if (!userAddress) return null;

    const { address2, countryId, ...rest } = userAddress;

    return {
      ...rest,
      country: countryId,
      address2: address2 ? address2 : "",
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
