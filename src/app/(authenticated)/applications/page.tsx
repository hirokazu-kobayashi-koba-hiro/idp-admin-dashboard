"use client";

import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@/components/Loading";
import { useApplications } from "@/hooks/useApplications";
import { Delete, Edit } from "@mui/icons-material";
import React from "react";
import { useRouter } from "next/navigation";
import { DataGrid } from "@mui/x-data-grid";

const Applications = () => {
  const { fetchApplications } = useApplications();
  const router = useRouter();

  const { data, isPending, error } = useQuery({
    queryKey: ["fetchApplications"],
    queryFn: async () => {
      const { payload, error } = await fetchApplications();
      if (error) {
        throw new Error("error");
      }

      return {
        ...payload,
      };
    },
  });

  if (isPending) return <Loading />;
  if (error) return <Typography>error</Typography>;
  if (!data) return <Typography>loading</Typography>;

  const columns = [
    { field: "clientId", headerName: "clientId", width: 200 },
    { field: "clientName", headerName: "clientName", width: 200 },
    { field: "clientSecret", headerName: "clientSecret", width: 200 },
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
            router.push(`/applications/${data.row.clientId}`);
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
      renderCell: () => (
        <IconButton onClick={() => {}}>
          <Delete />
        </IconButton>
      ),
    },
  ];

  const rows = data.list?.map((item: any, index: number) => {
    return {
      id: index,
      ...item,
    };
  });

  return (
    <>
      <Container sx={{ m: 2 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant={"h4"}>Applications</Typography>
          <Box m={2} display="flex" justifyContent="flex-end">
            <Button
              variant={"outlined"}
              sx={{ textTransform: "none" }}
              onClick={() => {
                router.push("/applications/new");
              }}
            >
              New
            </Button>
          </Box>
          <DataGrid
            sx={{ margin: "auto", mt: 4 }}
            // @ts-ignore
            columns={columns}
            rows={rows}
          />
        </Paper>
      </Container>
    </>
  );
};

export default Applications;
