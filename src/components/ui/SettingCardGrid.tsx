import { Box, useTheme, alpha, Typography } from "@mui/material";
import { ReactNode } from "react";

type SettingCardGridProps = {
  title?: string;
  children: ReactNode;
};

export const SettingCardGrid = ({ title, children }: SettingCardGridProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        borderRadius: 4,
        px: { xs: 3, sm: 5 },
        py: { xs: 4, sm: 6 },
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
            ? "0 6px 24px rgba(0,0,0,0.025)"
            : "0 0 0 1px rgba(255,255,255,0.06)",
        transition: "all 0.3s ease",
      }}
    >
      {title && (
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            fontWeight: 600,
            fontSize: "1.125rem",
            letterSpacing: "0.01em",
            color: "text.primary",
          }}
        >
          {title}
        </Typography>
      )}
      {children}
    </Box>
  );
};
