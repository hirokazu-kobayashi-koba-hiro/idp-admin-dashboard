"use client";

import DashboardLayout from "@/components/DashboardLayout";
import React from "react";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import AppSettingsAltIcon from "@mui/icons-material/AppSettingsAlt";
import { systemAlertAtom } from "@/state/SystemState";
import { SystemAlertDialog } from "@/components/SystemAlertDialog";
import { useAtom } from "jotai";
import { Start } from "@mui/icons-material";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [systemAlert, setSystemAlert] = useAtom(systemAlertAtom);
  const menuItems = [
    { text: "Getting Started", icon: <Start />, path: "getting-started" },
    { text: "Statics", icon: <EqualizerIcon />, path: "/statics" },
    { text: "Applications", icon: <AppSettingsAltIcon />, path: "/applications" },
    { text: "Users", icon: <PeopleIcon />, path: "/users" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];
  const resetSystemAlertState = () => {
    setSystemAlert({
      open: false,
      title: "",
      body: null,
      onClickPositiveButton: () => {},
      onClickNegativeButton: () => {},
    });
  };

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
            resetSystemAlertState();
          }}
          onClickNegativeButton={() => {
            systemAlert.onClickNegativeButton();
            resetSystemAlertState();
          }}
        />
      )}
    </>
  );
}
