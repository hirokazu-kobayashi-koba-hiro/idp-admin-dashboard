"use client";

import {
  Box,
  Button,
  Container,
  Typography,
  IconButton,
  useTheme,
  Paper,
  alpha,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@/components/ui/Loading";
import { useApplications } from "@/hooks/useApplications";
import { Edit, Delete } from "@mui/icons-material";
import React from "react";
import { useRouter } from "next/navigation";
import { DataGrid } from "@mui/x-data-grid";

const Applications = () => {
  const theme = useTheme();
  const router = useRouter();
  const { fetchApplications } = useApplications();

  const { data, isPending, error } = useQuery({
    queryKey: ["fetchApplications"],
    queryFn: async () => {
      const { payload, error } = await fetchApplications();
      if (error) throw new Error("error");
      return payload;
    },
  });

  if (isPending) return <Loading />;
  if (error) return <Typography>Error loading applications</Typography>;
  if (!data) return <Typography>No applications found</Typography>;

  const columns = [
    { field: "clientId", headerName: "Client ID", flex: 1 },
    { field: "clientName", headerName: "Client Name", flex: 1 },
    {
      field: "clientSecret",
      headerName: "Client Secret",
      flex: 1,
      renderCell: () => "••••••••",
    },
    {
      field: "edit",
      headerName: "",
      sortable: false,
      width: 60,
      renderCell: (params: any) => (
        <IconButton
          onClick={() => router.push(`/applications/${params.row.clientId}`)}
          aria-label="Edit"
        >
          <Edit fontSize="small" />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "",
      sortable: false,
      width: 60,
      renderCell: () => (
        <IconButton aria-label="Delete" onClick={() => {}}>
          <Delete fontSize="small" />
        </IconButton>
      ),
    },
  ];

  const rows = data.list.map((item: any, index: number) => ({
    id: index,
    ...item,
  }));

  return (
    <Container maxWidth="lg" sx={{ pt: 4, pb: 10 }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          px: 4,
          py: 4,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#fcfcfd"
              : alpha(theme.palette.common.white, 0.03),
          border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
          boxShadow:
            theme.palette.mode === "light"
              ? "0 4px 12px rgba(0,0,0,0.02)"
              : "0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: "1.125rem",
              letterSpacing: "0.01em",
              color: "text.primary",
            }}
          >
            Applications
          </Typography>
          <Button
            variant="contained"
            sx={{ textTransform: "none", fontWeight: 500 }}
            onClick={() => router.push("/applications/new")}
          >
            New
          </Button>
        </Box>

        {/* Table */}
        <Box sx={{ height: 520, mt: 2 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            disableColumnMenu
            sx={{
              border: "none",
              fontSize: "0.875rem",
              "& .MuiDataGrid-cell": {
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.06)}`,
              },
            }}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default Applications;
