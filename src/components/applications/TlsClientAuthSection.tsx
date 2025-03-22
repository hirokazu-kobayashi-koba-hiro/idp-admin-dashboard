import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Grid,
  useTheme,
  Fade,
  alpha,
} from "@mui/material";
import { useFormikContext } from "formik";
import { FormField } from "@/components/ui/FormField";

export default function TlsClientAuthSection() {
  const { values, setFieldValue } = useFormikContext<any>();
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
          TLS Client Authentication
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              label="TLS Client Auth Subject DN"
              name="tlsClientAuthSubjectDn"
              description="Distinguished Name used in mutual TLS authentication."
            />
            <FormField
              label="TLS SAN DNS"
              name="tlsClientAuthSanDns"
              description="Subject Alternative Name (DNS) for TLS client cert validation."
            />
            <FormField
              label="TLS SAN IP"
              name="tlsClientAuthSanIp"
              description="Subject Alternative Name (IP address)."
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormField
              label="TLS SAN URI"
              name="tlsClientAuthSanUri"
              description="Subject Alternative Name (URI) for client identification."
            />
            <FormField
              label="TLS SAN Email"
              name="tlsClientAuthSanEmail"
              description="Subject Alternative Name (email address)."
            />

            <Box mt={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="tlsClientCertificateBoundAccessTokens"
                    checked={values.tlsClientCertificateBoundAccessTokens}
                    onChange={(e) =>
                      setFieldValue(
                        "tlsClientCertificateBoundAccessTokens",
                        e.target.checked,
                      )
                    }
                  />
                }
                label="Enable TLS Certificate-Bound Access Tokens"
              />
              <Typography
                variant="body2"
                sx={{ fontSize: "0.75rem", color: "text.secondary", mt: 0.5 }}
              >
                When enabled, access tokens are bound to the client certificate
                for enhanced security.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
}
