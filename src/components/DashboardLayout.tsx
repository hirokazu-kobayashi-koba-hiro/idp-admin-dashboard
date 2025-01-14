'use client'

import React from "react";
import { Box, CssBaseline, AppBar, Toolbar, Typography } from "@mui/material";
import { Sidebar } from "./Sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";

const DashboardLayout = ({ children }: { children: React.ReactNode}) => {

    const menuItems = [
        { text: "Dashboard", icon: <DashboardIcon />, path: "/home" },
        { text: "Users", icon: <PeopleIcon />, path: "/users" },
        { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
    ];

    return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar menuItems={menuItems} open={false}/>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
