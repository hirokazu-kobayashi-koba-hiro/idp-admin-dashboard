"use client";

import DashboardLayout from "@/components/DashboardLayout";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import { systemAlertAtom } from "@/state/SystemState";
import { SystemAlertDialog } from "@/components/SystemAlertDialog";
import { useAtom } from "jotai";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [systemAlert, setSystemAlert] = useAtom(systemAlertAtom);
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/home" },
    { text: "Users", icon: <PeopleIcon />, path: "/users" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  return (
    <>
      <DashboardLayout menuItems={menuItems}>{children}</DashboardLayout>
      {systemAlert.open && (
        <SystemAlertDialog
          open={systemAlert.open}
          title={systemAlert.title}
          body={systemAlert.body}
          onClickPositiveButton={() => {
            systemAlert.onClickPositiveButton();
            setSystemAlert({
              open: false,
              title: "",
              body: null,
              onClickPositiveButton: () => {},
              onClickNegativeButton: () => {},
            });
          }}
          onClickNegativeButton={() => {
            systemAlert.onClickNegativeButton();
            setSystemAlert({
              open: false,
              title: "",
              body: null,
              onClickPositiveButton: () => {},
              onClickNegativeButton: () => {},
            });
          }}
        />
      )}
    </>
  );
}
