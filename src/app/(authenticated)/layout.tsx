"use client";

import DashboardLayout from "@/components/DashboardLayout";
import React from "react";
import { systemAlertAtom } from "@/state/SystemState";
import { SystemAlertDialog } from "@/components/ui/SystemAlertDialog";
import { useAtom } from "jotai";
import {
  PlayCircle,
  Rocket,
  BarChart2,
  AppWindow,
  Users,
  Settings,
} from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [systemAlert, setSystemAlert] = useAtom(systemAlertAtom);

  const sidebarSections = [
    {
      title: "Overview",
      items: [
        {
          text: "Getting Started",
          icon: <Rocket size={18} color="#0070f3" />, // Blue
          path: "/getting-started",
        },
        {
          text: "Playground",
          icon: <PlayCircle size={18} color="#10b981" />, // Green
          path: "/playground",
        },
        {
          text: "Activity",
          icon: <BarChart2 size={18} color="#6366f1" />, // Purple
          path: "/activity",
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          text: "Applications",
          icon: <AppWindow size={18} color="#ec4899" />, // Pink
          path: "/applications",
        },
        {
          text: "Users",
          icon: <Users size={18} color="#f59e0b" />, // Orange
          path: "/users",
        },
      ],
    },
    {
      title: "System",
      items: [
        {
          text: "Settings",
          icon: <Settings size={18} color="#6b7280" />, // Gray
          path: "/settings",
        },
      ],
    },
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
      <DashboardLayout sidebarSections={sidebarSections}>
        {children}
      </DashboardLayout>
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
