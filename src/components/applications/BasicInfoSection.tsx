import { Box, Typography, useTheme, Fade, alpha, Grid } from "@mui/material";
import { FormField } from "@/components/ui/FormField";

export default function BasicInfoSection() {
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
              : alpha(theme.palette.common.white, 0.035),
          border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
          boxShadow:
            theme.palette.mode === "light"
              ? "0 4px 16px rgba(0,0,0,0.02)"
              : "0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 600,
            fontSize: "1.125rem",
            letterSpacing: "0.01em",
            color: "text.primary",
          }}
        >
          Basic Information
        </Typography>

        <Grid container spacing={2}>
          {/* Identifiers (Read-only) */}
          <Grid item xs={12} sm={6}>
            <FormField label="Client ID" name="clientId" />
          </Grid>

          {/* Basic display info */}
          <Grid item xs={12} sm={6}>
            <FormField
              label="Client Name"
              name="clientName"
              description="Displayed to users on the consent screen and admin interfaces."
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Client ID Alias"
              name="clientIdAlias"
              description="An alternate human-readable name for this client."
            />
          </Grid>

          {/* URLs */}
          <Grid item xs={12} sm={6}>
            <FormField
              label="Client URI"
              name="clientUri"
              description="The main public URL for your application."
              placeholder="https://your-app.com"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Logo URI"
              name="logoUri"
              description="An optional image to show in user-facing places."
              placeholder="https://your-app.com/logo.png"
            />
          </Grid>

          {/* Contact */}
          <Grid item xs={12}>
            <FormField
              label="Contacts"
              name="contacts"
              description="Comma-separated email addresses for notifications and support."
            />
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
}
