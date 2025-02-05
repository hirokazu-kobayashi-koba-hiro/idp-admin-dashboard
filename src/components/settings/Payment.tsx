import React from "react";
import { Box } from "@mui/material";
import { SubscriptionDetail } from "@/components/settings/SubscriptionDetail";
import { PaymentMethodsList } from "@/components/settings/PaymentMethodList";
import { usePayments } from "@/hooks/usePayments";
import { useSession } from "next-auth/react";
import { useQueries } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { systemAlertAtom } from "@/state/SystemState";
import { Loading } from "@/components/Loading";

export const Payment = () => {
  const [, setSystemAlert] = useAtom(systemAlertAtom);
  const { fetchPaymentMethods, fetchSubscriptionDetail } = usePayments();
  const { data: session } = useSession();
  const customerId = session?.user.customerId || "";
  const subscriptionId = session?.user.subscriptionId || "";

  const results = useQueries({
    queries: [
      {
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
      },
      {
        queryKey: ["fetchSubscriptionDetail"],
        queryFn: async () => {
          const { payload, error } =
            await fetchSubscriptionDetail(subscriptionId);
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
      },
    ],
  });

  const paymentMethods = results[0].data || [];
  const subscription = results[1].data || {};
  const isLoading = results.some((query) => query.isLoading);
  const hasError = results.some((query) => query.isError);

  if (isLoading) return <Loading />;
  if (hasError) return <div>Error fetching data</div>;

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <SubscriptionDetail subscription={subscription} />
      </Box>
      <PaymentMethodsList paymentMethods={paymentMethods} />
    </>
  );
};
