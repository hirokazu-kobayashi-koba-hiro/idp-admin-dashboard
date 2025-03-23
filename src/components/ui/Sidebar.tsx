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
  ListSubheader,
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation";

export type MenuItem = {
  text: string;
  icon: React.ReactNode;
  path: string;
};

export type SidebarSection = {
  title: string;
  items: MenuItem[];
};

export type SidebarProps = {
  sections: SidebarSection[];
  open: boolean;
  onClose: () => void;
  width?: number;
};

export const Sidebar = ({
  sections,
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
              ? "#f8f8f8"
              : alpha(theme.palette.common.white, 0.025),
          pt: 2,
          pb: 4,
        },
      }}
      ModalProps={{ keepMounted: true }}
      aria-label="Sidebar navigation"
    >
      <Toolbar />
      <Box sx={{ overflowY: "auto", px: 1.5 }}>
        {sections.map((section, i) => (
          <List
            key={i}
            subheader={
              <ListSubheader
                disableSticky
                sx={{
                  backgroundColor: "transparent",
                  color: theme.palette.text.disabled,
                  fontWeight: 500,
                  fontSize: "0.75rem",
                  letterSpacing: "0.03em",
                  textTransform: "none",
                  mt: i > 0 ? 2 : 0,
                  mb: 0.5,
                }}
              >
                {section.title}
              </ListSubheader>
            }
          >
            {section.items.map((item, index) => {
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
                    mb: 0.5,
                    px: 2.5,
                    py: 1.1,
                    alignItems: "center",
                    color: isActive
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                    backgroundColor: isActive
                      ? alpha(theme.palette.primary.main, 0.08)
                      : "transparent",
                    borderLeft: isActive
                      ? `3px solid ${theme.palette.primary.main}`
                      : "3px solid transparent",
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 1.5,
                      color: isActive ? theme.palette.primary.main : "inherit",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        ))}
      </Box>
    </Drawer>
  );
};
