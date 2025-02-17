"use client";

import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { systemAlertAtom } from "@/state/SystemState";
import { Box, TextField, Typography } from "@mui/material";
import { Loading } from "@/components/Loading";
import { TabPanels } from "@/components/TabPanels";
import { useApplications } from "@/hooks/useApplications";
import { ApplicationBasic } from "@/components/applications/ApplicationBasic";

const ApplicationEditionPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { fetchApplication } = useApplications();
  const [, setSystemAlert] = useAtom(systemAlertAtom);

  const { data, error, isPending } = useQuery({
    queryKey: ["fetchApplication"],
    queryFn: async () => {
      const resolvedParams = await params;
      const id = resolvedParams.id;
      const { payload, error } = await fetchApplication(id);
      if (error) {
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
      return payload;
    },
  });
  if (isPending) {
    return <Loading />;
  }
  if (error) {
    return <Typography>error</Typography>;
  }
  console.log("application", data);

  const elements = [
    {
      label: "Basic",
      node: <ApplicationBasic application={data} />,
    },
    {
      label: "Authorization",
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
          <TextField variant="standard" value={"authorization"} />
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

export default ApplicationEditionPage;
