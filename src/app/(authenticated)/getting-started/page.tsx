"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { SiReact, SiAndroid, SiApple } from "react-icons/si";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ContentCopy } from "@mui/icons-material";
import { CodeSnippet } from "@/components/CodeSnippet";

const PlatformSelector = ({
  platforms,
  onSelect,
}: {
  platforms: any[];
  onSelect: (platform: any) => void;
}) => {
  const [selected, setSelected] = useState(null);

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
              selected === platform.name
                ? `3px solid ${platform.color}`
                : "1px solid #ccc",
            borderRadius: "10px",
            boxShadow:
              selected === platform.name
                ? `0 4px 10px ${platform.color}88`
                : "none",
            transition: "0.3s",
          }}
        >
          <CardActionArea onClick={() => handleSelect(platform.name)}>
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

const GettingStarted = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const platforms = [
    {
      name: "React",
      icon: <SiReact size={50} color="#61DBFB" />,
      color: "#61DBFB",
      sampleAppUrl: "https://github.com/auth0/auth0-spa-js/archive/main.zip",
    },
    {
      name: "Android",
      icon: <SiAndroid size={50} color="#3DDC84" />,
      color: "#3DDC84",
      sampleAppUrl: "https://github.com/auth0/Auth0.Android/archive/main.zip",
    },
    {
      name: "iOS",
      icon: <SiApple size={50} color="#A2AAAD" />,
      color: "#A2AAAD",
      sampleAppUrl: "https://github.com/auth0/Auth0.swift/archive/master.zip",
    },
  ];

  const fetchSampleAppRepository = async () => {
    try {
      const sampleApp = platforms.find(
        (platform) => platform.name === selectedPlatform,
      );

      const response = await fetch("/api/sample-app", {
        method: "POST",
        body: JSON.stringify({
          url: sampleApp?.sampleAppUrl || "",
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
    const { url, error } = await fetchSampleAppRepository();
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
  const reactCodeSnippet = `IDP_DOMAIN=your-react-domain.auth0.com\nIDP_CLIENT_ID=your-client-id\nIDP_CLIENT_SECRET=your-client-secret`;

  const handleCopy = (codeSnippet: string) => {
    navigator.clipboard.writeText(codeSnippet);
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
              onSelect={(selected: string) => {
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
          {selectedPlatform === "React" && (
            <Stack spacing={2}>
              <Typography variant={"h6"}>STEP2: Configure app</Typography>
              <CodeSnippet
                title={"React: .env"}
                code={reactCodeSnippet}
                codeLanguage={"bash"}
              />
              <Typography variant={"h6"}>STEP3: run app</Typography>
              <CodeSnippet
                title={"run command"}
                code={`npm install\nnpm run dev`}
                codeLanguage={"bash"}
              />
            </Stack>
          )}
          {selectedPlatform === "Android" && (
            <Stack spacing={2}>
              <Typography variant={"h6"}>STEP2: Configure app</Typography>
              <CodeSnippet
                title={"Android: config.json"}
                code={reactCodeSnippet}
                codeLanguage={"bash"}
              />
              <Typography variant={"h6"}>STEP3: run app</Typography>
            </Stack>
          )}
          {selectedPlatform === "iOS" && (
            <Stack spacing={2}>
              <Typography variant={"h6"}>STEP2: Configure app</Typography>
              <CodeSnippet
                title={"iOS: info.plist"}
                code={reactCodeSnippet}
                codeLanguage={"bash"}
              />
              <Typography variant={"h6"}>STEP3: run app</Typography>
            </Stack>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default GettingStarted;
