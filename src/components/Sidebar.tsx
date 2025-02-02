"use client";

import React from "react";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItemIcon,
  ListItemText, ListItemButton,
} from "@mui/material";
import { useRouter } from "next/navigation";

export type MenuItem = {
  text: string;
  icon: React.ReactNode;
  path: string;
};

export type SidebarProps = {
  menuItems: MenuItem[];
  open: boolean;
  onClose: () => void;
  width?: number;
};

export const Sidebar = ({
  menuItems,
  open,
  onClose,
  width = 240,
}: SidebarProps) => {
  const router = useRouter();

  return (
    <Drawer
      variant={open ? "permanent" : "temporary"}
      onClose={onClose}
      sx={{
        width: width,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: width, boxSizing: "border-box" },
      }}
      ModalProps={{
        keepMounted: true,
      }}
      aria-label="Sidebar navigation"
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item, index) => (
            <ListItemButton
              key={index}
              onClick={() => {
                router.push(item.path);
                onClose();
              }}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                },
                "&:active": {
                  backgroundColor: "rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
