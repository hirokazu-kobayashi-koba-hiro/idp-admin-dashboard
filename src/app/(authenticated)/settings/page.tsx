"use client";

import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  useTheme,
  alpha,
  Container,
  Stack,
} from "@mui/material";
import { TabPanels } from "@/components/ui/TabPanels";
import { Subscription } from "@/components/settings/Subscription";
import { Payment } from "@/components/settings/Payment";

const SettingsPage = () => {
  const theme = useTheme();

  const elements = [
    {
      label: "Basic",
      node: (
        <Paper
          elevation={0}
          sx={{
            px: { xs: 3, sm: 5 },
            py: { xs: 4, sm: 6 },
            maxWidth: 640,
            mx: "auto",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#fcfcfd"
                : alpha(theme.palette.common.white, 0.035),
            border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
            borderRadius: 4,
            boxShadow:
              theme.palette.mode === "light"
                ? "0 4px 12px rgba(0,0,0,0.02)"
                : `0 0 0 1px ${alpha(theme.palette.common.white, 0.05)}`,
          }}
        >
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  fontSize: "1.125rem",
                  color: "text.primary",
                }}
              >
                Account Settings
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 0.5, color: "text.secondary" }}
              >
                Update your username, email, and password.
              </Typography>
            </Box>

            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              size="small"
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              size="small"
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              size="small"
            />
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                sx={{ textTransform: "none" }}
              >
                Save Changes
              </Button>
            </Box>
          </Stack>
        </Paper>
      ),
    },
    {
      label: "Members",
      node: (
        <Box
          sx={{
            p: 4,
            maxWidth: 600,
            mx: "auto",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Coming soon.
          </Typography>
        </Box>
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
    <Container maxWidth="md" sx={{ pt: 2 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, mb: 3, color: "text.primary" }}
      >
        Settings
      </Typography>
      <TabPanels elements={elements} />
    </Container>
  );
};

export default SettingsPage;
