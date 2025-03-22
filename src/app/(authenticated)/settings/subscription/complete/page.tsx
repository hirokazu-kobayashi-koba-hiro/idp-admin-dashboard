"use client";

import React, { useEffect, useState } from "react";
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/navigation";

const SubscriptionCompletePage = () => {
  const router = useRouter();
  const theme = useTheme();
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
            <CheckCircleIcon color="success" sx={{ fontSize: 72 }} />

            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "text.primary" }}
              >
                Subscription Successful
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 1, color: "text.secondary" }}
              >
                Thank you for subscribing! Your subscription is now active.
              </Typography>
            </Box>

            {sessionId ? (
              <Box
                sx={{
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? "#f3f4f6"
                      : alpha(theme.palette.common.white, 0.06),
                  px: 2,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: "0.875rem",
                  fontFamily: "monospace",
                  width: "100%",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  color: "text.secondary",
                }}
              >
                Session ID: {sessionId}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No session information available.
              </Typography>
            )}

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

export default SubscriptionCompletePage;
