"use client";

import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { MenuItem, Sidebar } from "./Sidebar";
import { Logout, Menu } from "@mui/icons-material";
import { signOut } from "next-auth/react";

const DashboardLayout = ({
  menuItems,
  children,
}: {
  menuItems: MenuItem[];
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Box display="flex" alignItems="center">
            <IconButton
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" noWrap>
              Dashboard
            </Typography>
            <IconButton
              onClick={async () => {
                await signOut();
                const logoutResponse = await fetch("/api/auth/logout");

                if (logoutResponse.ok) {
                  const { redirectUri } = await logoutResponse.json();
                  console.log(redirectUri);
                  if (redirectUri) {
                    window.location.href = redirectUri;
                  }
                }
              }}
            >
              <Logout />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Sidebar
        menuItems={menuItems}
        open={isOpen}
        onClose={() => {
          // setIsOpen(false)
        }}
        width={240}
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
