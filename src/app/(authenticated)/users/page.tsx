"use client";

import React, { useState } from "react";
import { Typography, IconButton, Box } from "@mui/material";
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
          onClickPositiveButton: () => {
            console.log("onClickPositiveButton");
          },
          onClickNegativeButton: () => {
            console.log("onClickNegativeButton");
          },
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
  if (error) return <div>Error: {error.message}</div>;
  if (deletionError) return <div>Error: {deletionError.message}</div>;
  const users: User[] = data;
  const columns = [
    { field: "sub", headerName: "Sub", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "edit",
      headerName: "edit",
      sortable: false,
      width: 90,
      disableClickEventBubbling: true,
      renderCell: (data: any) => (
        <IconButton
          onClick={() => {
            console.log("edit", data);
            router.push(`/users/${data.row.sub}`);
          }}
        >
          <Edit />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "delete",
      sortable: false,
      width: 90,
      disableClickEventBubbling: true,
      renderCell: (user: User) => (
        <IconButton
          onClick={() => {
            setSelectedUser(user.sub);
            setShowDialog(true);
          }}
        >
          <Delete />
        </IconButton>
      ),
    },
  ];

  const userList = users.map((user, index) => {
    return {
      id: index,
      ...user,
    };
  });

  return (
    <>
      <Typography variant="h6" sx={{ m: 2 }}>
        User List
      </Typography>
      <DataGrid
        sx={{ maxWidth: 800, margin: "auto", mt: 4 }}
        // @ts-ignore
        columns={columns}
        rows={userList}
      />
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
