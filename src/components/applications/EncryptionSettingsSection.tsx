import { Box, Typography, Grid, useTheme, Fade, alpha } from "@mui/material";
import { FormField } from "@/components/ui/FormField";

export default function EncryptionSettingsSection() {
  const theme = useTheme();

  return (
    <Fade in>
      <Box
        sx={{
          borderRadius: 4,
          px: 5,
          py: 5,
          maxWidth: "880px",
          mx: "auto",
          mb: 6,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          boxShadow:
            theme.palette.mode === "light"
              ? "0 8px 20px rgba(0,0,0,0.03)"
              : "0 0 0 1px rgba(255,255,255,0.06)",
          backdropFilter: "blur(2px)",
        }}
      >
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Token & Authorization Encryption
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              label="ID Token Encrypted Response Alg"
              name="idTokenEncryptedResponseAlg"
              description="Algorithm used to encrypt the ID token."
              placeholder="e.g. RSA-OAEP"
            />
            <FormField
              label="Authorization Signed Response Alg"
              name="authorizationSignedResponseAlg"
              description="Algorithm used to sign authorization responses."
              placeholder="e.g. RS256"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormField
              label="ID Token Encrypted Response Enc"
              name="idTokenEncryptedResponseEnc"
              description="Encryption encoding for the ID token."
              placeholder="e.g. A128GCM"
            />
            <FormField
              label="Authorization Encrypted Response Alg"
              name="authorizationEncryptedResponseAlg"
              description="Algorithm to encrypt authorization responses."
              placeholder="e.g. RSA-OAEP"
            />
            <FormField
              label="Authorization Encrypted Response Enc"
              name="authorizationEncryptedResponseEnc"
              description="Encryption encoding for authorization responses."
              placeholder="e.g. A256GCM"
            />
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
}
