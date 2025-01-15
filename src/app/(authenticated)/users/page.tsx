'use client'

import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { useQuery } from '@tanstack/react-query';
import { User } from "@/app/api/admin/users/route";
import {Loading} from "@/components/Loading";


const UsersPage = () => {

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const response = await fetch('/api/admin/users');
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  const users: User[] = data

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        User List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersPage;
