"use client";

import React from "react";
import {
  Button,
  Typography,
  Container,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRouter } from "next/navigation";

const SubscriptionCancelPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/settings");
  };

  return (
      <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
      >
        <Card
            elevation={3}
            sx={{
              padding: 4,
              borderRadius: 2,
              width: "100%",
            }}
        >
          <CardContent>
            <Stack spacing={4} alignItems="center" textAlign="center">
              {/* Cancel Icon */}
              <CancelIcon color="error" sx={{ fontSize: 80 }} />

              {/* Cancel Message */}
              <Typography variant="h5" fontWeight="bold" color="textPrimary">
                Subscription Cancelled
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Your subscription has been cancelled. If this was a mistake, you
                can resubscribe at any time.
              </Typography>

              {/* Back Button */}
              <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleClick}
                  sx={{ borderRadius: 2, paddingX: 3 }}
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
