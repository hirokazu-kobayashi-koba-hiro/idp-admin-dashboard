import {
  Box,
  Typography,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  OutlinedInput,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  useTheme,
  Fade,
  alpha,
  Tooltip,
} from "@mui/material";
import { useFormikContext } from "formik";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InfoOutlined from "@mui/icons-material/InfoOutlined";

const authMethods = [
  "client_secret_basic",
  "client_secret_post",
  "client_secret_jwt",
  "private_key_jwt",
  "none",
];

const grantTypesList = [
  "authorization_code",
  "implicit",
  "refresh_token",
  "client_credentials",
  "password",
  "urn:openid:params:grant-type:ciba",
];

const responseTypesList = [
  "code",
  "token",
  "id_token",
  "code token",
  "code id_token",
  "id_token token",
  "code id_token token",
];

function FormFieldWrapper({
  label,
  description,
  tooltip,
  children,
}: {
  label: string;
  description?: string;
  tooltip?: string;
  children: React.ReactNode;
}) {
  return (
    <Box py={2}>
      <Box display="flex" alignItems="center" gap={0.75} mb={0.5}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
        {tooltip && (
          <Tooltip title={tooltip}>
            <InfoOutlined sx={{ fontSize: 16, color: "text.secondary" }} />
          </Tooltip>
        )}
      </Box>
      {description && (
        <Typography
          variant="body2"
          sx={{ fontSize: "0.75rem", color: "text.secondary", mb: 1 }}
        >
          {description}
        </Typography>
      )}
      {children}
    </Box>
  );
}

export default function AuthSettingsSection() {
  const { values, handleChange, setFieldValue } = useFormikContext<any>();
  const [showSecret, setShowSecret] = useState(false);
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
          Authentication Settings
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormFieldWrapper
              label="Client Secret"
              description="Used to authenticate the client to the token endpoint."
              tooltip="Make sure to keep this value secure."
            >
              <TextField
                fullWidth
                name="clientSecret"
                value={values.clientSecret}
                onChange={handleChange}
                type={showSecret ? "text" : "password"}
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowSecret((prev) => !prev)}
                        edge="end"
                      >
                        {showSecret ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormFieldWrapper>

            <FormFieldWrapper
              label="Token Endpoint Auth Method"
              description="How the client authenticates at the token endpoint."
            >
              <FormControl fullWidth size="small">
                <Select
                  name="tokenEndpointAuthMethod"
                  value={values.tokenEndpointAuthMethod}
                  onChange={handleChange}
                  input={<OutlinedInput />}
                >
                  {authMethods.map((method) => (
                    <MenuItem key={method} value={method}>
                      {method}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FormFieldWrapper>

            <FormFieldWrapper
              label="Application Type"
              description="Indicates whether the app is web-based or native."
            >
              <FormControl fullWidth size="small">
                <Select
                  name="applicationType"
                  value={values.applicationType}
                  onChange={handleChange}
                  input={<OutlinedInput />}
                >
                  <MenuItem value="web">web</MenuItem>
                  <MenuItem value="native">native</MenuItem>
                </Select>
              </FormControl>
            </FormFieldWrapper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormFieldWrapper
              label="Grant Types"
              description="The OAuth2 flows supported by this client."
            >
              <FormControl fullWidth size="small">
                <Select
                  multiple
                  name="grantTypes"
                  value={values.grantTypes}
                  onChange={handleChange}
                  input={<OutlinedInput />}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {grantTypesList.map((type) => (
                    <MenuItem key={type} value={type}>
                      <Checkbox checked={values.grantTypes.includes(type)} />
                      <ListItemText primary={type} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FormFieldWrapper>

            <FormFieldWrapper
              label="Response Types"
              description="Determines the response modes supported by the client."
            >
              <FormControl fullWidth size="small">
                <Select
                  multiple
                  name="responseTypes"
                  value={values.responseTypes}
                  onChange={handleChange}
                  input={<OutlinedInput />}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {responseTypesList.map((type) => (
                    <MenuItem key={type} value={type}>
                      <Checkbox checked={values.responseTypes.includes(type)} />
                      <ListItemText primary={type} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FormFieldWrapper>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
}
