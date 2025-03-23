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
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loading } from "@/components/ui/Loading";
import { useApplications } from "@/hooks/useApplications";
import { Edit, Delete } from "@mui/icons-material";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DataGrid } from "@mui/x-data-grid";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";

const Applications = () => {
  const theme = useTheme();
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState("");
  const { fetchApplications } = useApplications();

  const { data, isLoading, error } = useQuery({
    queryKey: ["fetchApplications"],
    queryFn: async () => {
      const { payload, error } = await fetchApplications();
      if (error) throw new Error("error");
      return payload;
    },
  });

  const {
    mutate,
    isPending,
    error: deletionError,
  } = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/applications/${id}`, {
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
      renderCell: (params: any) => (
        <IconButton
          onClick={() => {
            setSelectedApplication(params.row.clientId);
            setShowDialog(true);
          }}
          sx={{ color: theme.palette.error.main }}
        >
          <Delete />
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
      {showDialog && (
        <ConfirmationDialog
          open={showDialog}
          title="Confirm deletion application"
          body={
            <Box mx={2} my={1}>
              <Typography variant="body2">
                When you delete a application, the application data is
                permanently deleted.
              </Typography>
            </Box>
          }
          onClickPositiveButton={() => {
            setShowDialog(false);
            mutate(selectedApplication);
          }}
          onClickNegativeButton={() => setShowDialog(false)}
        />
      )}
    </Container>
  );
};

export default Applications;
