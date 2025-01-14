'use client'

import React from "react";
import { Box, Drawer, Toolbar, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useRouter } from "next/navigation";

export type MenuItem = {
    text: string;
    icon: React.ReactNode;
    path: string;
};

export type SidebarProps = {
    menuItems: MenuItem[];
    open: boolean;
    onClose?: () => void;
};

export const Sidebar = ({ menuItems, open, onClose }: SidebarProps) => {
  const router = useRouter();

  return (
    <Drawer
      variant="permanent"
      open={open}
      onClose={onClose}
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
              key={index}
              onClick={() => {
                  router.push(item.path)
              }}
              sx={{
                backgroundColor: "inherit",
                color: "inherit",
              }}
            >
              <ListItemIcon
                sx={{ color: "inherit" }}
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
