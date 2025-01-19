"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { User } from "@/app/api/admin/users/route";
import { Loading } from "@/components/Loading";
import { Delete } from "@mui/icons-material";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";

const UsersPage = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const response = await fetch("/api/admin/users");
      if (!response.ok) throw new Error("Network response was not ok");
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
  if (error) return <div>Error: {error.message}</div>;
  if (deletionError) return <div>Error: {deletionError.message}</div>;
  const users: User[] = data;

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 600, margin: "auto", mt: 4 }}
      >
        <Typography variant="h6" sx={{ p: 2 }}>
          User List
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setSelectedUser(user.id);
                      setShowDialog(true);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {showDialog && (
        <ConfirmationDialog
          open={showDialog}
          title={"Confirm deletion user"}
          body={
            <Box mx={4}>
              <Typography variant={"body2"}>
                When you delete a user, the user data is permanently deleted.
              </Typography>
            </Box>
          }
          onClickPositiveButton={async () => {
            setShowDialog(false);
            mutate(selectedUser);
          }}
          onClickNegativeButton={() => setShowDialog(false)}
        />
      )}
    </>
  );
};

export default UsersPage;
