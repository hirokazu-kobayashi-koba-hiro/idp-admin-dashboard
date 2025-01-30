"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Container,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/navigation";

const SubscriptionCompletePage = () => {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setSessionId(query.get("session_id"));
    }
  }, []);

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
            {/* Success Icon */}
            <CheckCircleIcon color="success" sx={{ fontSize: 80 }} />

            {/* Success Message */}
            <Typography variant="h5" fontWeight="bold" color="textPrimary">
              Subscription Successful!
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Thank you for subscribing! Your subscription is now active.
            </Typography>

            {/* Session Details */}
            {sessionId ? (
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  padding: 2,
                  backgroundColor: "#f5f5f5",
                  borderRadius: 1,
                  width: "100%",
                  textAlign: "center",
                  wordWrap: "break-word", // Ensures long words break to the next line
                  overflowWrap: "break-word", // Alternative for better browser support
                  whiteSpace: "normal", // Allows wrapping to the next line
                }}
              >
                Session ID: {sessionId}
              </Typography>
            ) : (
              <Typography variant="body2" color="textSecondary">
                No session information available.
              </Typography>
            )}

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

export default SubscriptionCompletePage;
