"use client";

import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { systemAlertAtom } from "@/state/SystemState";
import { Typography } from "@mui/material";
import { Loading } from "@/components/ui/Loading";
import { useApplications } from "@/hooks/useApplications";
import { ApplicationForm } from "@/components/applications/ApplicationForm";

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

  return (
    <>
      <ApplicationForm initialApplication={data} />
    </>
  );
};

export default ApplicationEditionPage;
