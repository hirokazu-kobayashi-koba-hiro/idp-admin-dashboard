import { Box, Typography, TextField } from "@mui/material";
import { useFormikContext } from "formik";

export function FormField({
  label,
  name,
  description,
  placeholder,
  multiline,
  rows,
}: {
  label: string;
  name: string;
  description?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
}) {
  const { values, handleChange, touched, errors } = useFormikContext<any>();
  // @ts-ignore
  const hasError = Boolean(touched[name] && errors[name]);

  return (
    <Box>
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
      <TextField
        fullWidth
        size="small"
        name={name}
        value={values[name]}
        onChange={handleChange}
        placeholder={placeholder}
        multiline={multiline}
        minRows={rows}
        error={hasError}
        helperText={hasError ? errors[name] : " "}
      />
    </Box>
  );
}
