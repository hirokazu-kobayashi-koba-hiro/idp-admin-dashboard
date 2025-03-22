"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import { SiReact, SiAndroid, SiApple } from "react-icons/si";
import { ReactTemplate } from "@/app/(authenticated)/applications/new/templates/react";
import { AndroidTemplate } from "@/app/(authenticated)/applications/new/templates/android";
import { iOSTemplate } from "@/app/(authenticated)/applications/new/templates/ios";
import { useApplications } from "@/hooks/useApplications";
import { useRouter } from "next/navigation";

const platforms = [
  {
    name: "React",
    icon: <SiReact size={40} color="#61DBFB" />,
    color: "#61DBFB",
    template: ReactTemplate,
  },
  {
    name: "Android",
    icon: <SiAndroid size={40} color="#3DDC84" />,
    color: "#3DDC84",
    template: AndroidTemplate,
  },
  {
    name: "iOS",
    icon: <SiApple size={40} color="#A2AAAD" />,
    color: "#A2AAAD",
    template: iOSTemplate,
  },
];

export default function NewApplication() {
  const theme = useTheme();
  const [selected, setSelected] = useState<any>(null);
  const { postApplication } = useApplications();
  const router = useRouter();

  const handleSubmit = async () => {
    if (selected) {
      const { payload, error } = await postApplication(selected.template);
      if (payload && !error) {
        router.push("/applications");
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          p: 5,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#fcfcfd"
              : alpha(theme.palette.common.white, 0.03),
          border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
          boxShadow:
            theme.palette.mode === "light"
              ? "0 4px 12px rgba(0,0,0,0.02)"
              : "0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        <Stack spacing={4}>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: "1.125rem",
                color: "text.primary",
              }}
            >
              New Application
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
              Choose the type of application to register
            </Typography>
          </Box>

          <Box display="flex" justifyContent="center" gap={2}>
            {platforms.map((platform) => (
              <Card
                key={platform.name}
                sx={{
                  width: 120,
                  textAlign: "center",
                  border:
                    selected?.name === platform.name
                      ? `2px solid ${platform.color}`
                      : `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  boxShadow:
                    selected?.name === platform.name
                      ? `0 0 0 2px ${alpha(platform.color, 0.15)}`
                      : "none",
                  transition: "all 0.2s ease",
                  borderRadius: 3,
                }}
              >
                <CardActionArea onClick={() => setSelected(platform)}>
                  <CardContent>
                    <Box display="flex" justifyContent="center">
                      {platform.icon}
                    </Box>
                    <Typography variant="subtitle2" mt={1}>
                      {platform.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>

          <TextField
            name="clientName"
            type="text"
            label="Client Name"
            placeholder="e.g. My App"
            size="small"
            fullWidth
          />

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!selected}
              sx={{ textTransform: "none", fontWeight: 500 }}
            >
              Submit
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
