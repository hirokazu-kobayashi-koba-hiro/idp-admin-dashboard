"use client";

import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { TabPanels } from "@/components/TabPanels";
import { Subscription } from "@/components/settings/Subscription";
import { Payment } from "@/components/settings/Payment";

const SettingsPage = () => {
  const elements = [
    {
      label: "Basic",
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
      label: "Members",
      node: (
        <>
          <Box>
            <Typography>TODO</Typography>
          </Box>
        </>
      ),
    },
    {
      label: "Subscription",
      node: <Subscription />,
    },
    {
      label: "Payment",
      node: <Payment />,
    },
  ];

  return (
    <>
      <TabPanels elements={elements}></TabPanels>
    </>
  );
};

export default SettingsPage;
