"use client";

import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { onboardingRequestTemplate } from "@/app/onboarding/onboardingRequestTemplate";
import { useOnboarding } from "@/hooks/useOnboarding";
import { backendUrl } from "@/app/auth";
import DashboardAppBar from "@/components/ui/DashboardAppBar";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from 'uuid';

const InitialSetting = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const { postRegistration } = useOnboarding();
  const theme = useTheme();

  const createRequestBody = ( template: string, name: string, ) => {
    const organizationId = uuidv4();
    const tenantId = uuidv4();
    const issuer = backendUrl + "/" + tenantId;
    const clientId = uuidv4();
    const clientSecret = uuidv4()
    return JSON.parse(template.replaceAll("$NAME", name)
        .replaceAll("$ORGANIZATION_ID", organizationId)
        .replaceAll("$TENANT_ID", tenantId)
        .replaceAll("$ISSUER", issuer)
        .replaceAll("$CLIENT_ID", clientId)
        .replaceAll("$CLIENT_SECRET", clientSecret));
  }

  const handleNext = async () => {

    const requestBody = createRequestBody(JSON.stringify(onboardingRequestTemplate), name);

    const { payload, error } = await postRegistration(requestBody);

    if (payload && !error) {
      const newSession = await update({
        ...session,
        tenantId: payload.tenant.id
      });

      console.log("newSession", newSession);
      router.push("/activity");
      return;
    }
    console.error(error);
  };

  return (
    <>
      <DashboardAppBar sidebarWidth={0} />
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
