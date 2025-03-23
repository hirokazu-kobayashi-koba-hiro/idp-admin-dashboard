"use client";

import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { systemAlertAtom } from "@/state/SystemState";
import { User } from "@/app/api/admin/users/route";
import {
  Box,
  Container,
  Typography,
  Paper,
  useTheme,
  alpha,
  Button,
} from "@mui/material";
import { Loading } from "@/components/ui/Loading";
import { TabPanels } from "@/components/ui/TabPanels";
import { UserDetails } from "@/components/users/UserDetails";
import { Form, Formik } from "formik";

const UserEditionPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [, setSystemAlert] = useAtom(systemAlertAtom);
  const theme = useTheme();

  const { data, error, isPending } = useQuery({
    queryKey: ["fetchUser"],
    queryFn: async () => {
      const resolvedParams = await params;
      const userId = resolvedParams.id;
      const response = await fetch(`/api/admin/users/${userId}`);
      if (!response.ok) {
        setSystemAlert({
          open: true,
          title: "error",
          body: null,
          onClickPositiveButton: () => {},
          onClickNegativeButton: () => {},
        });
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isPending) return <Loading />;
  if (error) return <Typography>Error loading user data</Typography>;

  const user: User = data;

  const elements = [
    {
      label: "Details",
      node: <UserDetails />,
    },
    {
      label: "Devices",
      node: (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 400,
            mx: "auto",
            mt: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, color: "text.secondary" }}
          >
            Subject Identifier
          </Typography>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor:
                theme.palette.mode === "light"
                  ? "#f5f5f7"
                  : alpha(theme.palette.common.white, 0.04),
              border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
              fontSize: "0.875rem",
              wordBreak: "break-all",
            }}
          >
            {user.sub}
          </Box>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="md" sx={{ pt: 2 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, mb: 2, color: "text.primary" }}
      >
        User Information
      </Typography>
      <Paper
        elevation={0}
        sx={{
          px: 4,
          py: 4,
          borderRadius: 4,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#fcfcfd"
              : alpha(theme.palette.common.white, 0.035),
          border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
          boxShadow:
            theme.palette.mode === "light"
              ? "0 4px 12px rgba(0,0,0,0.03)"
              : `0 0 0 1px ${alpha(theme.palette.common.white, 0.05)}`,
        }}
      >
        <Formik
          initialValues={user}
          onSubmit={(values) => {
            console.log("Submitting", values);
            // Send to backend
          }}
        >
          {() => (
            <Form>
              <TabPanels elements={elements} />
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default UserEditionPage;
