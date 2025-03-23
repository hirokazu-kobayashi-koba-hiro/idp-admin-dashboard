import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  useTheme,
  Fade,
  alpha,
  IconButton,
} from "@mui/material";
import { useFormikContext, FieldArray } from "formik";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { FormField } from "@/components/ui/FormField";

export default function ScopeSettingsSection() {
  const { values, handleChange } = useFormikContext<any>();
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
          Scope & Authorization Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Scope"
              name="scope"
              placeholder="e.g. openid profile email"
              description="Space-separated list of scopes allowed for this client."
            />
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Authorization Details Types
          </Typography>

          <FieldArray name="authorizationDetailsTypes">
            {({ push, remove }) => (
              <Box display="flex" flexDirection="column" gap={1}>
                {values.authorizationDetailsTypes.map(
                  (type: string, idx: number) => (
                    <Box key={idx} display="flex" alignItems="center" gap={1}>
                      <TextField
                        fullWidth
                        size="small"
                        name={`authorizationDetailsTypes[${idx}]`}
                        label={`Type #${idx + 1}`}
                        value={type}
                        onChange={handleChange}
                      />
                      <IconButton
                        onClick={() => remove(idx)}
                        aria-label="Remove"
                      >
                        <DeleteOutline />
                      </IconButton>
                    </Box>
                  ),
                )}
                <Button
                  onClick={() => push("")}
                  variant="outlined"
                  size="small"
                  sx={{ alignSelf: "flex-start", mt: 1 }}
                >
                  Add Type
                </Button>
              </Box>
            )}
          </FieldArray>
        </Box>
      </Box>
    </Fade>
  );
}
