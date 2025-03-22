"use client";

import React from "react";
import {
  Button,
  Typography,
  Container,
  Stack,
  Card,
  CardContent,
  useTheme,
  alpha,
  Box,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRouter } from "next/navigation";

const SubscriptionCancelPage = () => {
  const router = useRouter();
  const theme = useTheme();

  const handleClick = () => {
    router.push("/settings");
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 10 }}>
      <Card
        elevation={0}
        sx={{
          px: { xs: 3, sm: 5 },
          py: { xs: 5, sm: 6 },
          borderRadius: 4,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#fcfcfd"
              : alpha(theme.palette.common.white, 0.035),
          border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
          boxShadow:
            theme.palette.mode === "light"
              ? "0 6px 24px rgba(0,0,0,0.025)"
              : "0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        <CardContent>
          <Stack spacing={4} alignItems="center" textAlign="center">
            <CancelIcon color="error" sx={{ fontSize: 72 }} />

            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "text.primary" }}
              >
                Subscription Cancelled
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 1, color: "text.secondary" }}
              >
                Your subscription has been cancelled. If this was a mistake, you
                can resubscribe at any time.
              </Typography>
            </Box>

            <Button
              variant="contained"
              onClick={handleClick}
              sx={{ textTransform: "none", borderRadius: 2, px: 4 }}
            >
              Go to Settings
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SubscriptionCancelPage;
