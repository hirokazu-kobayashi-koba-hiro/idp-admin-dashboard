// components/layout/DashboardAppBar.tsx
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    IconButton,
    Avatar,
    useTheme,
    alpha,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logout from "@mui/icons-material/Logout";
import {signOut, useSession} from "next-auth/react";

export default function DashboardAppBar({ sidebarWidth = 240 }: { sidebarWidth?: number }) {
    const theme = useTheme();
    const { data: session } = useSession();

    const handleLogout = async () => {
        await signOut();
        const logoutResponse = await fetch("/api/auth/logout");
        if (logoutResponse.ok) {
            const { redirectUri } = await logoutResponse.json();
            if (redirectUri) {
                window.location.href = redirectUri;
            }
        }
    };

    return (
        <AppBar
            position="fixed"
            color="inherit"
            elevation={0}
            sx={{
                width: { sm: `calc(100% - ${sidebarWidth}px)` },
                ml: { sm: `${sidebarWidth}px` },
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                backgroundColor:
                    theme.palette.mode === "light"
                        ? "#fff"
                        : alpha(theme.palette.common.white, 0.04),
            }}
        >
            <Toolbar sx={{ px: 3 }}>
                <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton edge="start" color="inherit" sx={{ mr: 1 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                        Admin Dashboard
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar sx={{ width: 32, height: 32 }} />
                    <Typography variant="body2" color="text.secondary">
                        {session?.user?.email}
                    </Typography>
                    <IconButton onClick={handleLogout}>
                        <Logout />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}