"use client";

import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTenants } from "@/hooks/useTenants";
import { tenantConfigTemplate } from "@/app/initial/setting/tenantConfigTemplate";

const InitialSetting = () => {
  const router = useRouter();
  const [tenantName, setTenantName] = useState("");
  const { postTenant } = useTenants();

  const handleNext = async () => {
    const { payload, error } = await postTenant(tenantConfigTemplate);
    if (payload && !error) {
      console.log(payload);
      router.push("/activity");
      return;
    }
    console.error(error);
  };

  return (
    <>
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
