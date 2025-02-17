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
} from "@mui/material";
import { SiReact, SiAndroid, SiApple } from "react-icons/si";
import { ReactTemplate } from "@/app/(authenticated)/applications/new/templates/react";
import { AndroidTemplate } from "@/app/(authenticated)/applications/new/templates/android";
import { iOSTemplate } from "@/app/(authenticated)/applications/new/templates/ios";
import { useApplications } from "@/hooks/useApplications";
import { useRouter } from "next/navigation";

type Platform = {
  name: string;
  icon: React.ReactNode;
  color: string;
  template: any;
};

const PlatformSelector = ({
  platforms,
  onSelect,
}: {
  platforms: any[];
  // eslint-disable-next-line no-unused-vars
  onSelect: (platform: any) => void;
}) => {
  const [selected, setSelected] = useState<Platform | null>(null);

  const handleSelect = (platform: any) => {
    setSelected(platform);
    onSelect(platform);
  };

  return (
    <Box display="flex" justifyContent="center" gap={2} p={3}>
      {platforms.map((platform) => (
        <Card
          key={platform.name}
          sx={{
            width: 150,
            textAlign: "center",
            border:
              selected?.name === platform.name
                ? `3px solid ${platform.color}`
                : "1px solid #ccc",
            borderRadius: "10px",
            boxShadow:
              selected?.name === platform.name
                ? `0 4px 10px ${platform.color}88`
                : "none",
            transition: "0.3s",
          }}
        >
          <CardActionArea onClick={() => handleSelect(platform)}>
            <CardContent>
              {platform.icon}
              <Typography variant="h6" sx={{ mt: 1 }}>
                {platform.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
};

const NewApplication = () => {
  const [selected, setSelected] = useState<Platform | null>(null);
  const { postApplication } = useApplications();
  const router = useRouter();

  const platforms = [
    {
      name: "React",
      icon: <SiReact size={50} color="#61DBFB" />,
      color: "#61DBFB",
      template: ReactTemplate,
    },
    {
      name: "Android",
      icon: <SiAndroid size={50} color="#3DDC84" />,
      color: "#3DDC84",
      template: AndroidTemplate,
    },
    {
      name: "iOS",
      icon: <SiApple size={50} color="#A2AAAD" />,
      color: "#A2AAAD",
      template: iOSTemplate,
    },
  ];

  const handleSubmit = async () => {
    if (selected) {
      const { payload, error } = await postApplication(selected.template);
      console.log(payload, error);
      if (payload && !error) {
        router.push("/applications");
      }
    }
  };

  return (
    <>
      <Container maxWidth={"md"} sx={{ m: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Stack spacing={4}>
            <Typography variant={"h5"}>New Application</Typography>
            <Typography variant={"body1"}>Choose application type</Typography>
            <PlatformSelector
              platforms={platforms}
              onSelect={(platform: any) => {
                console.log(platform);
                setSelected(platform);
              }}
            />

            <TextField
              name={"clientName"}
              type={"text"}
              label={"clientName"}
              placeholder={"sample app"}
            ></TextField>
            <Button
              variant={"contained"}
              sx={{ textTransform: "none" }}
              disabled={selected === null}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Stack>
        </Paper>
      </Container>
    </>
  );
};

export default NewApplication;
