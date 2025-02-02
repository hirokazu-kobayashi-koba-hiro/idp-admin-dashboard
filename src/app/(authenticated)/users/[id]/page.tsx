"use client";

import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { systemAlertAtom } from "@/state/SystemState";
import { User } from "@/app/api/admin/users/route";
import { Box, TextField, Typography } from "@mui/material";
import { Loading } from "@/components/Loading";
import { TabPanels } from "@/components/TabPanels";
import { UserDetails } from "@/components/users/UserDetails";

const UserEditionPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [, setSystemAlert] = useAtom(systemAlertAtom);

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
          onClickPositiveButton: () => {
            console.log("onClickPositiveButton");
          },
          onClickNegativeButton: () => {
            console.log("onClickNegativeButton");
          },
        });
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  if (isPending) {
    return <Loading />;
  }
  if (error) {
    return <Typography>error</Typography>;
  }

  const user: User = data;
  const elements = [
    {
      label: "details",
      node: <UserDetails user={user} />,
    },
    {
      label: "devices",
      node: (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 400,
            margin: "0 auto",
          }}
        >
          <TextField variant="standard" value={user.sub} />
        </Box>
      ),
    },
  ];

  return (
    <>
      <TabPanels elements={elements} />
    </>
  );
};

export default UserEditionPage;
