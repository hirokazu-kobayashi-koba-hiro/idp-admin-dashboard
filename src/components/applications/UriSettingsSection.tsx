import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  useTheme,
  Fade,
  alpha,
} from "@mui/material";
import { FieldArray, useFormikContext } from "formik";
import DeleteOutline from "@mui/icons-material/DeleteOutline";

export default function UriSettingsSection() {
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
          Redirect & Request URIs
        </Typography>

        {/* Redirect URIs */}
        <Box mb={4}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Redirect URIs
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: "0.75rem", color: "text.secondary", mb: 1 }}
          >
            Used in OAuth/OIDC flows to return tokens or codes after
            authentication.
          </Typography>

          <FieldArray name="redirectUris">
            {({ push, remove }) => (
              <Box display="flex" flexDirection="column" gap={1}>
                {values.redirectUris?.map((uri: string, idx: number) => (
                  <Box key={idx} display="flex" alignItems="center" gap={1}>
                    <TextField
                      fullWidth
                      size="small"
                      name={`redirectUris[${idx}]`}
                      label={`Redirect URI #${idx + 1}`}
                      value={uri}
                      onChange={handleChange}
                    />
                    <IconButton onClick={() => remove(idx)} aria-label="Remove">
                      <DeleteOutline />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  onClick={() => push("")}
                  variant="outlined"
                  size="small"
                  sx={{ alignSelf: "flex-start", mt: 1 }}
                >
                  Add Redirect URI
                </Button>
              </Box>
            )}
          </FieldArray>
        </Box>

        {/* Request URIs */}
        <Box mb={4}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Request URIs
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: "0.75rem", color: "text.secondary", mb: 1 }}
          >
            Optional: Pre-registered URIs to host signed JWT Authorization
            Requests.
          </Typography>

          <FieldArray name="requestUris">
            {({ push, remove }) => (
              <Box display="flex" flexDirection="column" gap={1}>
                {values.requestUris?.map((uri: string, idx: number) => (
                  <Box key={idx} display="flex" alignItems="center" gap={1}>
                    <TextField
                      fullWidth
                      size="small"
                      name={`requestUris[${idx}]`}
                      label={`Request URI #${idx + 1}`}
                      value={uri}
                      onChange={handleChange}
                    />
                    <IconButton onClick={() => remove(idx)} aria-label="Remove">
                      <DeleteOutline />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  onClick={() => push("")}
                  variant="outlined"
                  size="small"
                  sx={{ alignSelf: "flex-start", mt: 1 }}
                >
                  Add Request URI
                </Button>
              </Box>
            )}
          </FieldArray>
        </Box>

        {/* supportedJar */}
        <FormControlLabel
          control={
            <Checkbox
              name="supportedJar"
              checked={values.supportedJar}
              onChange={(e) => setFieldValue("supportedJar", e.target.checked)}
            />
          }
          label="Supports JAR (JWT Authorization Requests)"
        />
        <Typography
          variant="body2"
          sx={{ fontSize: "0.75rem", color: "text.secondary", mt: 0.5 }}
        >
          Enable this if the client supports JWT-based authorization request
          objects.
        </Typography>
      </Box>
    </Fade>
  );
}
