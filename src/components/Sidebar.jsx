'use client'

import React from "react";
import { Box, Drawer, Toolbar, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";

const Sidebar = () => {
  const router = useRouter();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/home" },
    { text: "Users", icon: <PeopleIcon />, path: "/users" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              component={Link}
              href={item.path}
              sx={{
                backgroundColor: router.pathname === item.path ? "primary.main" : "inherit",
                color: router.pathname === item.path ? "white" : "inherit",
              }}
            >
              <ListItemIcon
                sx={{ color: router.pathname === item.path ? "white" : "inherit" }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
