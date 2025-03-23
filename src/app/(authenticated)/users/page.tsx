"use client";

import React, { useState } from "react";
import {
  Typography,
  IconButton,
  Box,
  Container,
  Paper,
  useTheme,
  alpha,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { User } from "@/app/api/admin/users/route";
import { Loading } from "@/components/Loading";
import { Delete, Edit } from "@mui/icons-material";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { useRouter } from "next/navigation";
import { systemAlertAtom } from "@/state/SystemState";
import { useAtom } from "jotai";
import { DataGrid } from "@mui/x-data-grid";

const UsersPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const [, setSystemAlert] = useAtom(systemAlertAtom);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["fetchUsers"],
    queryFn: async () => {
      const response = await fetch("/api/admin/users");
      if (!response.ok) {
        setSystemAlert({
          open: true,
          title: "error",
          body: null,
          onClickPositiveButton: () => {},
          onClickNegativeButton: () => {},
        });
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const {
    mutate,
    isPending,
    error: deletionError,
  } = useMutation({
    mutationFn: async (userId: string) => {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Network response was not ok");
    },
  });

  if (isLoading || isPending) return <Loading />;
  if (error || deletionError) {
    // @ts-ignore
    return <Typography>Error: {(error || deletionError).message}</Typography>;
  }

  const users: User[] = data;
  const columns = [
    { field: "sub", headerName: "Sub", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "edit",
      headerName: "",
      sortable: false,
      width: 80,
      renderCell: (data: any) => (
        <IconButton
          onClick={() => router.push(`/users/${data.row.sub}`)}
          sx={{ color: theme.palette.text.secondary }}
        >
          <Edit />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "",
      sortable: false,
      width: 80,
      renderCell: (data: any) => (
        <IconButton
          onClick={() => {
            setSelectedUser(data.row.sub);
            setShowDialog(true);
          }}
          sx={{ color: theme.palette.error.main }}
        >
          <Delete />
        </IconButton>
      ),
    },
  ];

  const userList = users.map((user, index) => ({ id: index, ...user }));

  return (
    <Container maxWidth="lg" sx={{ pt: 2 }}>
      <Box mb={4}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          User Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          View and manage registered users
        </Typography>
      </Box>

      <Paper
        sx={{
          borderRadius: 4,
          px: 3,
          py: 4,
          boxShadow:
            theme.palette.mode === "light"
              ? "0 4px 12px rgba(0,0,0,0.03)"
              : `0 0 0 1px ${alpha(theme.palette.common.white, 0.1)}`,
        }}
      >
        <DataGrid
          autoHeight
          columns={columns}
          rows={userList}
          disableRowSelectionOnClick
          sx={{
            backgroundColor:
              theme.palette.mode === "light"
                ? "#fff"
                : alpha(theme.palette.common.white, 0.04),
            border: "none",
          }}
        />
      </Paper>

      {showDialog && (
        <ConfirmationDialog
          open={showDialog}
          title="Confirm deletion user"
          body={
            <Box mx={2} my={1}>
              <Typography variant="body2">
                When you delete a user, the user data is permanently deleted.
              </Typography>
            </Box>
          }
          onClickPositiveButton={() => {
            setShowDialog(false);
            mutate(selectedUser);
          }}
          onClickNegativeButton={() => setShowDialog(false)}
        />
      )}
    </Container>
  );
};

export default UsersPage;
