"use client";

import { IconButton, Typography } from "@mui/material";
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
      renderCell: (data: any) => (
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
      <Typography variant={"h4"}>Applications</Typography>
      <DataGrid
        sx={{ maxWidth: 800, margin: "auto", mt: 4 }}
        // @ts-ignore
        columns={columns}
        rows={rows}
      />
    </>
  );
};

export default Applications;
