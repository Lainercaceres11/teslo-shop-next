"use client";

import React from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

export const Provider = ({ children }: Props) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "",
        currency: "USD",
        intent: "capture",
      }}
    >
      <SessionProvider>{children}</SessionProvider>{" "}
    </PayPalScriptProvider>
  );
};
