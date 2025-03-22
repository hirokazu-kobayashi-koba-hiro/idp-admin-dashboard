import { Box, Typography, Grid, useTheme, Fade, alpha } from "@mui/material";
import { FormField } from "@/components/ui/FormField";

export default function SoftwareAndLegalSection() {
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
          backgroundColor:
            theme.palette.mode === "light"
              ? "#fcfcfd"
              : "rgba(255,255,255,0.03)",
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          boxShadow:
            theme.palette.mode === "light"
              ? "0 8px 20px rgba(0,0,0,0.03)"
              : "0 0 0 1px rgba(255,255,255,0.06)",
          backdropFilter: "blur(2px)",
        }}
      >
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Software Info, JWKS, and Legal URLs
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Software ID"
              name="softwareId"
              description="Optional unique ID for the software."
              placeholder="abc123-client-app"
            />
            <FormField
              label="JWKS URI"
              name="jwksUri"
              description="URL to fetch the client's public keys."
              placeholder="https://your-app.com/.well-known/jwks.json"
            />
            <FormField
              label="Terms of Service URI"
              name="tosUri"
              description="URL to your terms of service page."
              placeholder="https://your-app.com/terms"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormField
              label="Software Version"
              name="softwareVersion"
              description="Human-readable version of the client app."
              placeholder="1.0.0"
            />
            <FormField
              label="JWKS (JSON)"
              name="jwks"
              description="Inline JSON Web Key Set used for verification."
              multiline
              rows={6}
              placeholder='{ "keys": [...] }'
            />
            <FormField
              label="Privacy Policy URI"
              name="policyUri"
              description="URL to your privacy policy page."
              placeholder="https://your-app.com/privacy"
            />
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
}
