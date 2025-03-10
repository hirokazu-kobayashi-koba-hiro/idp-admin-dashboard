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
} from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { tenantConfigTemplate } from "@/app/onboarding/tenantConfigTemplate";
import { useOnboarding } from "@/hooks/useOnboarding";
import { signOut, useSession } from "next-auth/react";
import { Logout } from "@mui/icons-material";

const InitialSetting = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [tenantName, setTenantName] = useState("");
  const { postRegistration } = useOnboarding();

  const handleNext = async () => {
    const requestBody = {
      tenant_name: "test",
      organization_name: "test",
      server_config: JSON.stringify(tenantConfigTemplate),
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
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" noWrap>
              Dashboard
            </Typography>
            <IconButton
              onClick={async () => {
                await signOut();
                const logoutResponse = await fetch("/api/auth/logout");

                if (logoutResponse.ok) {
                  const { redirectUri } = await logoutResponse.json();
                  console.log(redirectUri);
                  if (redirectUri) {
                    window.location.href = redirectUri;
                  }
                }
              }}
            >
              <Logout />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Paper
          sx={{
            mt: 6,
            p: 6,
            borderRadius: 4,
            boxShadow: 3,
            textAlign: "center",
            maxWidth: 500,
          }}
        >
          <Box mb={3}>
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Initial Setting
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Once your tenant registration is complete, you will unlock
              seamless access to your dedicated IdP service, ensuring secure and
              efficient authentication for your users.
            </Typography>
          </Box>
          <Box mt={4} sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
            <TextField
              label="Tenant Name"
              name="tenantName"
              placeholder="Enter your tenant name"
              value={tenantName}
              inputMode="text"
              onChange={(e) => setTenantName(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleNext}
              sx={{ borderRadius: 2, fontWeight: "bold" }}
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
