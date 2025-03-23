import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";

export type ConfirmationDialogProps = {
  open: boolean;
  title: string;
  body?: React.ReactNode;
  onClickPositiveButton: () => void;
  onClickNegativeButton: () => void;
};

export const ConfirmationDialog = ({
  open,
  title,
  body,
  onClickPositiveButton,
  onClickNegativeButton,
}: ConfirmationDialogProps) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#fcfcfd"
              : alpha(theme.palette.common.white, 0.035),
          border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
          boxShadow:
            theme.palette.mode === "light"
              ? "0 8px 32px rgba(0,0,0,0.05)"
              : "0 0 0 1px rgba(255,255,255,0.06)",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, fontSize: "1.125rem" }}>
        {title}
      </DialogTitle>
      {body && (
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            {body}
          </Typography>
        </DialogContent>
      )}
      <DialogActions sx={{ px: 3, pb: 2, pt: 0 }}>
        <Button
          onClick={onClickNegativeButton}
          color="inherit"
          sx={{ textTransform: "none" }}
        >
          Cancel
        </Button>
        <Button
          onClick={onClickPositiveButton}
          variant="contained"
          sx={{ textTransform: "none" }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
