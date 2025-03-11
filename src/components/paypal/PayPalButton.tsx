"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js";
import { paypalCheckPayments, setTransaction } from "@/actions";

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ amount, orderId }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const amountOrder = Math.round((amount * 100) / 100).toString() ?? "0";

  if (isPending) {
    return (
      <div className="animate-pulse mt-16">
        <div className="h-11 bg-gray-400 rounded-md" />
        <div className="h-11 bg-gray-400 rounded-md mt-5" />
      </div>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    action: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await action.order.create({
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            currency_code: "USD",
            value: amountOrder,
          },
        },
      ],
      intent: "CAPTURE",
    });

    const { ok } = await setTransaction(orderId, transactionId);

    if (!ok) {
      throw new Error("No se pudo realizar la transacción");
    }

    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();
    if (!details) return;

    await paypalCheckPayments(details.id ?? "");
  };
  return (
    <div className="relative top-0 right-0 z-0">
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  );
};
