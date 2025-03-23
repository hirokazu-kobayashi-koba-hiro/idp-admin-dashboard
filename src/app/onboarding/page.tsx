"use client";

import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { tenantConfigTemplate } from "@/app/onboarding/tenantConfigTemplate";
import { useOnboarding } from "@/hooks/useOnboarding";
import { signOut, useSession } from "next-auth/react";
import { Logout } from "@mui/icons-material";
import { backendUrl } from "@/app/auth";

const InitialSetting = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const { postRegistration } = useOnboarding();
  const theme = useTheme();

  const handleNext = async () => {
    const requestBody = {
      tenant_name: name,
      organization_name: name,
      server_domain: backendUrl,
      server_configuration: JSON.stringify(tenantConfigTemplate),
    };

    const { payload, error } = await postRegistration(requestBody);

    if (payload && !error) {
      const newSession = await update({
        ...session,
        organizationId: payload.id,
        tenantId:
          payload.assignedTenants?.length > 0
            ? payload.assignedTenants[0].id
            : undefined,
      });

      console.log("newSession", newSession);
      router.push("/activity");
      return;
    }
    console.error(error);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#ffffff"
              : alpha(theme.palette.common.white, 0.04),
          color: "text.primary",
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight={600}>
            Dashboard
          </Typography>
          <IconButton
            onClick={async () => {
              await signOut();
              const logoutResponse = await fetch("/api/auth/logout");
              if (logoutResponse.ok) {
                const { redirectUri } = await logoutResponse.json();
                if (redirectUri) {
                  window.location.href = redirectUri;
                }
              }
            }}
          >
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ pt: 14 }}>
        <Paper
          elevation={0}
          sx={{
            px: 6,
            py: 6,
            borderRadius: 4,
            textAlign: "center",
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
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Initial Setting
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Once your tenant registration is complete, you will unlock seamless
            access to your dedicated IdP service, ensuring secure and efficient
            authentication for your users.
          </Typography>

          <Box
            sx={{
              gap: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              label="Tenant Name"
              name="tenantName"
              placeholder="Enter your tenant name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              size="small"
              sx={{ maxWidth: 400 }}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleNext}
              disabled={!name.trim()}
              sx={{ borderRadius: 2, fontWeight: 600, px: 4 }}
            >
              Next
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default InitialSetting;
