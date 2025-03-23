"use client";

import React from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Sidebar, SidebarSection } from "@/components/ui/Sidebar";

import DashboardAppBar from "@/components/ui/DashboardAppBar";

const DashboardLayout = ({
  sidebarSections,
  children,
}: {
  sidebarSections: SidebarSection[];
  children: React.ReactNode;
}) => {
  const sidebarWidth = 240;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <DashboardAppBar sidebarWidth={sidebarWidth} />
      <Sidebar
        sections={sidebarSections}
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
