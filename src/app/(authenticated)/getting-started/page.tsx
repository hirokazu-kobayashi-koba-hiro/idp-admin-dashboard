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
import { ReactTemplate } from "@/app/(authenticated)/applications/new/templates/react";
import { AndroidTemplate } from "@/app/(authenticated)/applications/new/templates/android";
import { iOSTemplate } from "@/app/(authenticated)/applications/new/templates/ios";
import { useApplications } from "@/hooks/useApplications";

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

type Platform = {
  name: string;
  icon: React.ReactNode;
  color: string;
  sampleAppUrl: string;
  template: any;
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
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null,
  );
  const [application, setApplication] = useState<any | null>(null);
  const { postApplication } = useApplications();

  const platforms = [
    {
      name: "React",
      icon: <SiReact size={50} color="#61DBFB" />,
      color: "#61DBFB",
      sampleAppUrl:
        "https://github.com/hirokazu-kobayashi-koba-hiro/idp-next-auth-sample-app/archive/main.zip",
      template: ReactTemplate,
      step2: {
        title: "React: setup .env",
        codeSnippet:
          'export NEXT_PUBLIC_IDP_SERVER_ISSUER="$NEXT_PUBLIC_IDP_SERVER_ISSUER"\n' +
          'export NEXT_PUBLIC_FRONTEND_URL="http://localhost:4000"\n' +
          'export NEXT_PUBLIC_IDP_CLIENT_ID="$NEXT_PUBLIC_IDP_CLIENT_ID"\n' +
          'export NEXT_IDP_CLIENT_SECRET="$NEXT_IDP_CLIENT_SECRET"\n' +
          "\n" +
          "chmod +x setup_env.sh\n" +
          "./setup_env.sh",
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
      template: AndroidTemplate,
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
      template: iOSTemplate,
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

  const handleCreationApllication = async () => {
    if (selectedPlatform) {
      const { payload, error } = await postApplication(
        selectedPlatform.template,
      );
      console.log(payload, error);
      if (payload && !error) {
        setApplication({
          issuer: payload.issuer,
          clientId: payload.clientId,
          clientSecret: payload.clientSecret,
          clientName: payload.clientName,
          redirectUris: payload.redirectUris,
        });
      }
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

  const embedEnvironment = (platform: any) => {
    switch (platform.name) {
      case "React": {
        return platform.step2.codeSnippet
          .replace("$NEXT_PUBLIC_IDP_SERVER_ISSUER", application.issuer)
          .replace("$NEXT_PUBLIC_IDP_CLIENT_ID", application.clientId)
          .replace("$NEXT_IDP_CLIENT_SECRET", application.clientSecret);
      }
      default: {
        return platform.step2.codeSnippet;
      }
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
              STEP1: Create New Application
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
              variant={"contained"}
              disabled={selectedPlatform === null}
              onClick={handleCreationApllication}
              sx={{
                width: 150,
                textTransform: "none",
              }}
            >
              Create
            </Button>
          </Box>
          {application && (
            <>
              <CodeSnippet
                title={"new application"}
                code={JSON.stringify(application, null, 2)}
                codeLanguage={"json"}
              />
            </>
          )}
          <Box>
            <Typography variant={"h6"}>
              STEP2: Download sample app for selected platform
            </Typography>
          </Box>
          <Box m={2} display="flex" justifyContent="flex-end">
            <Button
              variant={"outlined"}
              disabled={selectedPlatform === null}
              onClick={handleClick}
              sx={{
                width: 150,
                textTransform: "none",
              }}
            >
              Download
            </Button>
          </Box>
          {application && selectedPlatform && (
            <Stack spacing={2}>
              <Typography variant={"h6"}>STEP3: Configure app</Typography>
              <CodeSnippet
                title={selectedPlatform.step2.title}
                code={embedEnvironment(selectedPlatform)}
                codeLanguage={selectedPlatform.step2.codeLanguage}
              />
              <Typography variant={"h6"}>STEP4: run app</Typography>
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
