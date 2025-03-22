import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
  OutlinedInput,
  Grid,
  useTheme,
  Fade,
  alpha,
} from "@mui/material";
import { useFormikContext } from "formik";

const cibaDeliveryModes = ["poll", "ping", "push"];

function FormFieldWrapper({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Box py={2}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
        {label}
      </Typography>
      {description && (
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.75rem",
            color: "text.secondary",
            mb: 1,
          }}
        >
          {description}
        </Typography>
      )}
      {children}
    </Box>
  );
}

export default function CibaSettingsSection() {
  const { values, handleChange, setFieldValue } = useFormikContext<any>();
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
          CIBA Settings
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormFieldWrapper
              label="Token Delivery Mode"
              description="Defines how the token is sent back to the client."
            >
              <FormControl fullWidth size="small">
                <InputLabel>Backchannel Token Delivery Mode</InputLabel>
                <Select
                  name="backchannelTokenDeliveryMode"
                  value={values.backchannelTokenDeliveryMode}
                  onChange={handleChange}
                  input={
                    <OutlinedInput label="Backchannel Token Delivery Mode" />
                  }
                >
                  {cibaDeliveryModes.map((mode) => (
                    <MenuItem key={mode} value={mode}>
                      {mode}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FormFieldWrapper>

            <FormFieldWrapper
              label="Auth Request Signing Alg"
              description="Algorithm used to sign the CIBA authentication request."
            >
              <TextField
                fullWidth
                size="small"
                name="backchannelAuthenticationRequestSigningAlg"
                value={values.backchannelAuthenticationRequestSigningAlg}
                onChange={handleChange}
              />
            </FormFieldWrapper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormFieldWrapper
              label="Notification Endpoint"
              description="Where to send backchannel delivery responses."
            >
              <TextField
                fullWidth
                size="small"
                name="backchannelClientNotificationEndpoint"
                value={values.backchannelClientNotificationEndpoint}
                onChange={handleChange}
              />
            </FormFieldWrapper>

            <FormFieldWrapper
              label="User Code Parameter"
              description="Check if user code input is required during CIBA flow."
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="backchannelUserCodeParameter"
                    checked={values.backchannelUserCodeParameter}
                    onChange={(e) =>
                      setFieldValue(
                        "backchannelUserCodeParameter",
                        e.target.checked,
                      )
                    }
                  />
                }
                label="Enable Backchannel User Code Parameter"
              />
            </FormFieldWrapper>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
}
