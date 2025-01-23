"use client";

import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { TabPanels } from "@/components/TabPanels";
import { Subscription } from "@/components/settings/Subscription";

const SettingsPage = () => {
  const productItems = [
    {
      priceId: "price_1QkDavGLT3LvnebjiYKsYlOb",
      name: "Basic",
      description: "$100.00 / month",
    },
    {
      priceId: "price_1QkDboGLT3Lvnebj64tVBrOF",
      name: "Pro",
      description: "$200.00 / month",
    },
    {
      priceId: "price_1QkDboGLT3LvnebjMN8oIyk3",
      name: "Enterprise",
      description: "$400.00 / month",
    },
  ];

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
          successUrl={
            "http://localhost:3000/settings/subscription?success=true&session_id={CHECKOUT_SESSION_ID}"
          }
          cancelUrl={
            "http://localhost:3000/settings/subscription?canceled=true"
          }
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
