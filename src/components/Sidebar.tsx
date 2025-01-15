'use client';

import React from "react";
import {Box, Drawer, Toolbar, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {useRouter} from "next/navigation";

export type MenuItem = {
    text: string;
    icon: React.ReactNode;
    path: string;
};

export type SidebarProps = {
    menuItems: MenuItem[];
    open: boolean;
    onClose: () => void;
    width: number;
};

export const Sidebar = ({ menuItems, open, onClose, width = 240 }: SidebarProps) => {
    const router = useRouter();

    return (
        <Drawer
            variant="persistent"
            open={open}
            onClose={onClose}
            sx={{
                width: width,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {width: width, boxSizing: "border-box"},
            }}
            ModalProps={{
                keepMounted: true,
            }}
            aria-label="Sidebar navigation"
        >
            <Toolbar/>
            <Box sx={{overflow: "auto"}}>
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem
                            key={index}
                            onClick={() => {
                                router.push(item.path);
                                onClose();
                            }}
                            sx={{
                                backgroundColor: "inherit",
                                color: "inherit",
                            }}
                        >
                            <ListItemIcon sx={{color: "inherit"}}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};
