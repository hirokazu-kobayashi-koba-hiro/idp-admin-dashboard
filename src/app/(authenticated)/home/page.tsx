'use client'

import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";


const DashboardPage = () => {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h5">Total Users</Typography>
                        <Typography variant="h4">1,200</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h5">Sales Trend</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default DashboardPage;
