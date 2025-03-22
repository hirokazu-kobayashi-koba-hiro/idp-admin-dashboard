import {
  Box,
  Grid,
  TextField,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import { useFormikContext } from "formik";

export type FieldProps = {
  label: string;
  name: string;
  disabled?: boolean;
  description?: string;
  placeholder?: string;
};

export default function Field({
  label,
  name,
  disabled = false,
  description,
  placeholder,
}: FieldProps) {
  const { values, handleChange, touched, errors } = useFormikContext<any>();
  // @ts-ignore
  const hasError = Boolean(touched[name] && errors[name]);
  const theme = useTheme();

  // @ts-ignore
  return (
    <Grid
      container
      spacing={3}
      alignItems="flex-start"
      sx={{
        py: 3,
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.06)}`,
        "&:last-child": { borderBottom: "none" },
        transition: "all 0.3s ease",
      }}
    >
      <Grid item xs={12} sm={4}>
        <Box pr={2}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              fontSize: "0.875rem",
            }}
          >
            {label}
          </Typography>
          {description && (
            <Typography
              variant="body2"
              sx={{ fontSize: "0.75rem", color: "text.secondary", mt: 0.5 }}
            >
              {description}
            </Typography>
          )}
        </Box>
      </Grid>

      <Grid item xs={12} sm={8}>
        <TextField
          fullWidth
          size="small"
          name={name}
          value={values[name]}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          error={hasError}
          // helperText={hasError ? errors[name] : " "}
          variant="outlined"
          sx={{
            "& input": { fontSize: "0.925rem" },
            "& .MuiOutlinedInput-root": {
              backgroundColor: disabled
                ? theme.palette.action.disabledBackground
                : theme.palette.background.paper,
              transition: "all 0.2s ease",
              borderRadius: 2,
              "&:hover": {
                boxShadow: disabled
                  ? "none"
                  : `0 0 0 2px ${alpha(theme.palette.primary.main, 0.06)}`,
              },
              "&.Mui-focused": {
                boxShadow: disabled
                  ? "none"
                  : `0 0 0 2px ${alpha(theme.palette.primary.main, 0.14)}`,
              },
            },
          }}
        />
      </Grid>
    </Grid>
  );
}
