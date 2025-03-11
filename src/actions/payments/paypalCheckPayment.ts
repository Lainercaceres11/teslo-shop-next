"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayments = async (paypalTransactionId: string) => {
  const authToken = await getPaypalBearerToken();

  if (!authToken) {
    return {
      ok: false,
      message: "No se puedo realizar el check",
    };
  }

  const response = await verifyPaypalPayment(paypalTransactionId, authToken);

  if (!response) {
    return {
      ok: false,
      message: "No se ha podido verificar el pago",
    };
  }

  const { purchase_units, status } = response;
  const { invoice_id } = purchase_units[0];

  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: "No se ha pagado en paypal",
    };
  }

  try {
    await prisma.order.update({
      where: { id: invoice_id },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });
  } catch {
    return {
      false: true,
      message: "No se pudo verificar el pago",
    };
  }

  revalidatePath(`/orders/${invoice_id}`);

  return {
    ok: true,
    message: "Orden pagada.",
  };
};

const getPaypalBearerToken = async () => {
  //define variables env
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

  // Obtain baseToken base 64
  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  // Create headers
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const unlercoded = new URLSearchParams();
  unlercoded.append("grant_type", "client_credentials");

  const requestOption = {
    method: "POST",
    headers: myHeaders,
    body: unlercoded,
  };

  try {
    const response = await fetch(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      {
        ...requestOption,
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(
        "Error al obtener el token de PayPal",
        await response.text()
      );
      return null;
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

const verifyPaypalPayment = async (
  paypalTransactionId: string,
  bearerToken: string
) => {
  const PAYPAL_ORDERS_URL = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;

  // Create headers
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOption = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(PAYPAL_ORDERS_URL, {
      ...requestOption,
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        "Error al obtener la verificación de PayPal",
        await response.text()
      );
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
