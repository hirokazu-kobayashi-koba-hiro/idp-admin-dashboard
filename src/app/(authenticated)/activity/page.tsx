"use client";

import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@/components/Loading";
import { Statics } from "@/app/api/admin/statics/route";

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

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5">Total Users</Typography>
            <Typography variant="h4">{statics.totalUsers}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5">DAU</Typography>
            <Typography variant="h4">{statics.dau}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
