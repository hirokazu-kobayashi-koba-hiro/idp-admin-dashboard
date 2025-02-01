import React from "react";
import { Box } from "@mui/material";
import { SubscriptionDetail } from "@/components/settings/SubscriptionDetail";
import { PaymentMethodsList } from "@/components/settings/PaymentMethodList";
import { usePayments } from "@/hooks/usePayments";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { systemAlertAtom } from "@/state/SystemState";

export const Payment = () => {
  const [, setSystemAlert] = useAtom(systemAlertAtom);
  const { fetchPaymentMethods } = usePayments();
  const { data: session } = useSession();
  const customerId = session?.user.customerId || "";

  const { data } = useQuery({
    queryKey: ["fetchPaymentMethods"],
    queryFn: async () => {
      const { payload, error } = await fetchPaymentMethods(customerId);
      if (!payload && error) {
        setSystemAlert({
          open: true,
          title: "error",
          body: null,
          onClickPositiveButton: () => {
            console.log("onClickPositiveButton");
          },
          onClickNegativeButton: () => {
            console.log("onClickNegativeButton");
          },
        });
        throw new Error("Network response was not ok");
      }
      return payload;
    },
  });

  if (!data) return <div>error</div>;

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <SubscriptionDetail />
      </Box>
      <PaymentMethodsList paymentMethods={data} />
    </>
  );
};
