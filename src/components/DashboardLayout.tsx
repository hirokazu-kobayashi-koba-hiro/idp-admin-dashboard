"use client";

import React from "react";
import {
  Box,
  CssBaseline,
  Toolbar,
} from "@mui/material";
import { MenuItem, Sidebar } from "@/components/ui/Sidebar";

import DashboardAppBar from "@/components/ui/DashboardAppBar";

const DashboardLayout = ({
  menuItems,
  children,
}: {
  menuItems: MenuItem[];
  children: React.ReactNode;
}) => {
  const sidebarWidth = 240

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <DashboardAppBar sidebarWidth={sidebarWidth}/>
      <Sidebar
        menuItems={menuItems}
        open={true}
        onClose={() => {
          // setIsOpen(false)
        }}
        width={sidebarWidth}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
