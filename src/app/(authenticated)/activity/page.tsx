"use client";

import React from "react";
import {
  Grid,
  Card,
  Typography,
  Container,
  useTheme,
  alpha,
  Box,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@/components/ui/Loading";
import { Statics } from "@/app/api/admin/statics/route";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StatCard = ({
  title,
  value,
  chartData,
}: {
  title: string;
  value: number;
  chartData?: any[];
}) => {
  const theme = useTheme();
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        px: 3,
        py: 4,
        backgroundColor:
          theme.palette.mode === "light"
            ? "#fcfcfd"
            : alpha(theme.palette.common.white, 0.035),
        border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        boxShadow:
          theme.palette.mode === "light"
            ? "0 4px 12px rgba(0,0,0,0.02)"
            : "0 0 0 1px rgba(255,255,255,0.05)",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 500, color: "text.secondary", mb: 1 }}
      >
        {title}
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
        {value.toLocaleString()}
      </Typography>
      {chartData && (
        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={alpha(theme.palette.divider, 0.2)}
            />
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke={theme.palette.primary.main}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

const DashboardPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-statics"],
    queryFn: async () => {
      const response = await fetch("/api/admin/statics");
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  const statics: Statics = data;

  const dummyDauTrend = [
    { name: "Mon", value: 120 },
    { name: "Tue", value: 150 },
    { name: "Wed", value: 180 },
    { name: "Thu", value: 160 },
    { name: "Fri", value: 200 },
    { name: "Sat", value: 170 },
    { name: "Sun", value: 190 },
  ];

  return (
    <Container maxWidth="lg" sx={{ pt: 2 }}>
      <Box mb={4}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, color: "text.primary" }}
        >
          Admin Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Overview of your system usage
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard title="Total Users" value={statics.totalUsers} />
        </Grid>

        <Grid item xs={12}>
          <StatCard
            title="Daily Active Users"
            value={statics.dau}
            chartData={dummyDauTrend}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
