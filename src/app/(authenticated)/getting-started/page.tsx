"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { SiReact, SiAndroid, SiApple } from "react-icons/si";
import { CodeSnippet } from "@/components/CodeSnippet";

const PlatformSelector = ({
  platforms,
  onSelect,
}: {
  platforms: any[];
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

type Platform = {
  name: string;
  icon: React.ReactNode;
  color: string;
  sampleAppUrl: string;
  step2: {
    title: string;
    codeSnippet: string;
    codeLanguage: string;
  };
  step3: {
    title: string;
    codeSnippet: string;
    codeLanguage: string;
  };
};

const GettingStarted = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<
    Platform | undefined
  >(undefined);

  const platforms = [
    {
      name: "React",
      icon: <SiReact size={50} color="#61DBFB" />,
      color: "#61DBFB",
      sampleAppUrl:
        "https://github.com/hirokazu-kobayashi-koba-hiro//idp-admin-dashboard/archive/main.zip",
      step2: {
        title: "React: .env",
        codeSnippet:
          "IDP_DOMAIN=your-react-domain.com\nIDP_CLIENT_ID=your-client-id\nIDP_CLIENT_SECRET=your-client-secret",
        codeLanguage: "bash",
      },
      step3: {
        title: "run command",
        codeSnippet: "npm install\nnpm run dev",
        codeLanguage: "bash",
      },
    },
    {
      name: "Android",
      icon: <SiAndroid size={50} color="#3DDC84" />,
      color: "#3DDC84",
      sampleAppUrl:
        "https://github.com/hirokazu-kobayashi-koba-hiro/vc-wallet-android-app/archive/main.zip",
      step2: {
        title: "Android: resources",
        codeSnippet:
          '<string name="com_vc_wallet_client_id">sKUsWLY5BCzdXAggk78km7kOjfQP1rWR</string>\n<string name="com_vc_wallet_domain">dev-l6ns7qgdx81yv2rs.us.auth0.com</string>\n<string name="com_vc_wallet_scheme">org.idp.verifiable.credentials</string>',
        codeLanguage: "bash",
      },
      step3: {
        title: "run command",
        codeSnippet: "",
        codeLanguage: "bash",
      },
    },
    {
      name: "iOS",
      icon: <SiApple size={50} color="#A2AAAD" />,
      color: "#A2AAAD",
      sampleAppUrl:
        "https://github.com/hirokazu-kobayashi-koba-hiro/vc-wallet-ios-app/archive/main.zip",
      step2: {
        title: "iOS: info.plist",
        codeSnippet:
          "IDP_DOMAIN=your-react-domain.com\nIDP_CLIENT_ID=your-client-id\nIDP_CLIENT_SECRET=your-client-secret",
        codeLanguage: "bash",
      },
      step3: {
        title: "iOS: ",
        codeSnippet: "",
        codeLanguage: "bash",
      },
    },
  ];

  const fetchSampleAppRepository = async () => {
    try {
      const response = await fetch("/api/sample-app", {
        method: "POST",
        body: JSON.stringify({
          url: selectedPlatform?.sampleAppUrl || "",
        }),
      });
      console.log(response);
      const body = await response.json();
      return {
        url: body.url,
      };
    } catch (e) {
      return {
        error: e,
      };
    }
  };

  const handleClick = async () => {
    const { url } = await fetchSampleAppRepository();
    if (url) {
      console.log(url);
      const a = document.createElement("a");
      a.href = url;
      a.download = `sample-app.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(a.href);
    }
  };

  return (
    <>
      <Box m={2}>
        <Typography variant={"h4"}>Getting Started</Typography>
      </Box>
      <Box
        m={4}
        sx={{
          maxWidth: 600,
          margin: "0 auto",
        }}
      >
        <Stack spacing={2}>
          <Typography variant={"body1"}>
            Integrate IdP service into your application or use one of our
            samples to get started in minutes.
          </Typography>
          <Box>
            <Typography variant={"h6"}>
              STEP1: Select a platform for your app and download
            </Typography>
            <PlatformSelector
              platforms={platforms}
              onSelect={(selected: any) => {
                console.log(selected);
                setSelectedPlatform(selected);
              }}
            />
          </Box>
          <Box m={2} display="flex" justifyContent="flex-end">
            <Button
              variant={"outlined"}
              onClick={handleClick}
              sx={{
                maxWidth: 200,
              }}
            >
              download
            </Button>
          </Box>
          {selectedPlatform && (
            <Stack spacing={2}>
              <Typography variant={"h6"}>STEP2: Configure app</Typography>
              <CodeSnippet
                title={selectedPlatform.step2.title}
                code={selectedPlatform.step2.codeSnippet}
                codeLanguage={selectedPlatform.step2.codeLanguage}
              />
              <Typography variant={"h6"}>STEP3: run app</Typography>
              <CodeSnippet
                title={selectedPlatform.step3.title}
                code={selectedPlatform.step3.codeSnippet}
                codeLanguage={selectedPlatform.step3.codeLanguage}
              />
            </Stack>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default GettingStarted;
