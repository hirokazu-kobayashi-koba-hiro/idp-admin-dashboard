"use client";

import DashboardLayout from "@/components/DashboardLayout";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/home" },
    { text: "Users", icon: <PeopleIcon />, path: "/users" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  return <DashboardLayout menuItems={menuItems}>{children}</DashboardLayout>;
}
