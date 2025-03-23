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
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import { SiReact, SiAndroid, SiApple } from "react-icons/si";
import { CodeSnippet } from "@/components/ui/CodeSnippet";
import { ReactTemplate } from "@/app/(authenticated)/applications/new/templates/react";
import { AndroidTemplate } from "@/app/(authenticated)/applications/new/templates/android";
import { iOSTemplate } from "@/app/(authenticated)/applications/new/templates/ios";
import { useApplications } from "@/hooks/useApplications";

const platforms = [
  {
    name: "React",
    icon: <SiReact size={40} color="#61DBFB" />,
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
        'export NEXT_IDP_CLIENT_SECRET="$NEXT_IDP_CLIENT_SECRET"',
      codeLanguage: "bash",
    },
    step3: {
      title: "Run command",
      codeSnippet: "npm install\nnpm run dev",
      codeLanguage: "bash",
    },
  },
  {
    name: "Android",
    icon: <SiAndroid size={40} color="#3DDC84" />,
    color: "#3DDC84",
    sampleAppUrl:
      "https://github.com/hirokazu-kobayashi-koba-hiro/vc-wallet-android-app/archive/main.zip",
    template: AndroidTemplate,
    step2: {
      title: "Android: resources",
      codeSnippet:
        '<string name="com_vc_wallet_client_id">client_id</string>\n<string name="com_vc_wallet_domain">domain</string>\n<string name="com_vc_wallet_scheme">scheme</string>',
      codeLanguage: "bash",
    },
    step3: {
      title: "Run command",
      codeSnippet: "",
      codeLanguage: "bash",
    },
  },
  {
    name: "iOS",
    icon: <SiApple size={40} color="#A2AAAD" />,
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
      title: "Run command",
      codeSnippet: "",
      codeLanguage: "bash",
    },
  },
];

export default function GettingStarted() {
  const theme = useTheme();
  const [selectedPlatform, setSelectedPlatform] = useState<any | null>(null);
  const [application, setApplication] = useState<any | null>(null);
  const { postApplication } = useApplications();

  const handleCreationApplication = async () => {
    if (selectedPlatform) {
      const { payload, error } = await postApplication(
        selectedPlatform.template,
      );
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

  const fetchSampleAppRepository = async () => {
    try {
      const res = await fetch("/api/sample-app", {
        method: "POST",
        body: JSON.stringify({ url: selectedPlatform?.sampleAppUrl || "" }),
      });
      const body = await res.json();
      return { url: body.url };
    } catch (e) {
      return { error: e };
    }
  };

  const handleClickDownload = async () => {
    const { url } = await fetchSampleAppRepository();
    if (url) {
      const a = document.createElement("a");
      a.href = url;
      a.download = `sample-app.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(a.href);
    }
  };

  const embedEnvironment = (platform: any) => {
    if (!application) return platform.step2.codeSnippet;
    switch (platform.name) {
      case "React": {
        return platform.step2.codeSnippet
          .replace("$NEXT_PUBLIC_IDP_SERVER_ISSUER", application.issuer)
          .replace("$NEXT_PUBLIC_IDP_CLIENT_ID", application.clientId)
          .replace("$NEXT_IDP_CLIENT_SECRET", application.clientSecret);
      }
      default:
        return platform.step2.codeSnippet;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 5,
          borderRadius: 4,
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
            <Typography variant="h6" fontWeight={600}>
              Getting Started
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Integrate IdP into your app or use a starter template.
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight={500}>
              Step 1: Select Platform
            </Typography>
            <Box display="flex" justifyContent="center" gap={2} mt={2}>
              {platforms.map((platform) => (
                <Card
                  key={platform.name}
                  sx={{
                    width: 120,
                    textAlign: "center",
                    border:
                      selectedPlatform?.name === platform.name
                        ? `2px solid ${platform.color}`
                        : `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    boxShadow:
                      selectedPlatform?.name === platform.name
                        ? `0 0 0 2px ${alpha(platform.color, 0.15)}`
                        : "none",
                    transition: "all 0.2s ease",
                    borderRadius: 3,
                  }}
                >
                  <CardActionArea onClick={() => setSelectedPlatform(platform)}>
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
            <Box mt={2} textAlign="right">
              <Button
                variant="contained"
                disabled={!selectedPlatform}
                onClick={handleCreationApplication}
                sx={{ textTransform: "none" }}
              >
                Create
              </Button>
            </Box>
          </Box>

          {application && (
            <CodeSnippet
              title="New Application"
              code={JSON.stringify(application, null, 2)}
              codeLanguage="json"
            />
          )}

          <Box>
            <Typography variant="subtitle1" fontWeight={500}>
              Step 2: Download Sample App
            </Typography>
            <Box mt={2} textAlign="right">
              <Button
                variant="outlined"
                disabled={!selectedPlatform}
                onClick={handleClickDownload}
                sx={{ textTransform: "none" }}
              >
                Download
              </Button>
            </Box>
          </Box>

          {application && selectedPlatform && (
            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle1" fontWeight={500}>
                  Step 3: Configure App
                </Typography>
                <CodeSnippet
                  title={selectedPlatform.step2.title}
                  code={embedEnvironment(selectedPlatform)}
                  codeLanguage={selectedPlatform.step2.codeLanguage}
                />
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight={500}>
                  Step 4: Run App
                </Typography>
                <CodeSnippet
                  title={selectedPlatform.step3.title}
                  code={selectedPlatform.step3.codeSnippet}
                  codeLanguage={selectedPlatform.step3.codeLanguage}
                />
              </Box>
            </Stack>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}
