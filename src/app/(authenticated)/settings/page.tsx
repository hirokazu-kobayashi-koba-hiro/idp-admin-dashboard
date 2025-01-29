"use client";

import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { TabPanels } from "@/components/TabPanels";
import { Subscription } from "@/components/settings/Subscription";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai/index";
import { systemAlertAtom } from "@/state/SystemState";
import { Loading } from "@/components/Loading";
import { usePayments } from "@/hooks/usePayments";

const SettingsPage = () => {
  const [, setSystemAlert] = useAtom(systemAlertAtom);
  const { fetchPrices } = usePayments();

  const productId = "prod_RdUaxgZxpFkf6l";
  const { data, isPending, error } = useQuery({
    queryKey: ["fetchPrices"],
    queryFn: async () => {
      const { payload, error } = await fetchPrices(productId);
      if (error) {
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
  console.log(data);

  if (isPending) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  const productItems: [] = data;

  const elements = [
    {
      label: "basic",
      node: (
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 400,
            margin: "0 auto",
          }}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h5">Settings</Typography>
          <TextField label="Username" variant="outlined" fullWidth />
          <TextField label="Email" variant="outlined" fullWidth />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
          />
          <Button variant="contained" color="primary" type="submit">
            Save Changes
          </Button>
        </Box>
      ),
    },
    {
      label: "subscription",
      node: (
        <Subscription
          items={productItems}
          successUrl={"http://localhost:3000/settings/subscription/complete"}
          cancelUrl={"http://localhost:3000/settings/subscription/cancel"}
        />
      ),
    },
  ];

  return (
    <>
      <TabPanels elements={elements}></TabPanels>
    </>
  );
};

export default SettingsPage;
