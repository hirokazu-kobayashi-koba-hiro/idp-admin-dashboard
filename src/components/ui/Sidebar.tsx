"use client";

import React from "react";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  useTheme,
  alpha,
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const theme = useTheme();

  return (
    <Drawer
      variant={open ? "permanent" : "temporary"}
      onClose={onClose}
      sx={{
        width: width,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: width,
          boxSizing: "border-box",
          borderRight: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#f9f9fb"
              : alpha(theme.palette.common.white, 0.02),
          pt: 2,
        },
      }}
      ModalProps={{
        keepMounted: true,
      }}
      aria-label="Sidebar navigation"
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <ListItemButton
                key={index}
                onClick={() => {
                  router.push(item.path);
                  onClose();
                }}
                selected={isActive}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  mb: 0.5,
                  px: 2,
                  py: 1,
                  color: isActive
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                  backgroundColor: isActive
                    ? alpha(theme.palette.primary.main, 0.08)
                    : "transparent",
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: isActive ? theme.palette.primary.main : "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: "0.95rem",
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};
