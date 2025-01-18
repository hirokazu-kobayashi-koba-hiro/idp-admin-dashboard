"use client";

import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { TabPanels } from "@/components/TabPanels";

const SettingsPage = () => {
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
      label: "payment",
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
  ];

  return (
    <>
      <TabPanels elements={elements}></TabPanels>
    </>
  );
};

export default SettingsPage;
