import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";

type SystemAlertDialogProps = {
  open: boolean;
  title: string;
  body?: React.ReactNode;
  onClickPositiveButton: () => void;
  onClickNegativeButton: () => void;
};

export const SystemAlertDialog = ({
  open,
  title,
  body,
  onClickPositiveButton,
  onClickNegativeButton,
}: SystemAlertDialogProps) => {
  return (
    <>
      <Dialog open={open} maxWidth={"xs"}>
        <DialogTitle>{title}</DialogTitle>
        {body && <DialogBody>{body}</DialogBody>}
        <DialogActions>
          <Button onClick={onClickNegativeButton}>CANCEL</Button>
          <Button onClick={onClickPositiveButton}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
