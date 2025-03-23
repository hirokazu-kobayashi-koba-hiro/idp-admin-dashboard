"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Container,
  Stack,
  useTheme,
  alpha,
} from "@mui/material";
import { CodeSnippet } from "@/components/ui/CodeSnippet";
import { decodeJwt } from "@/functions/oauth";
import { frontendUrl } from "@/app/auth";

const steps = [
  "Authorization Request",
  "Getting AuthorizationCode",
  "Token Request",
  "Getting Token",
  "Decode IDToken",
  "Getting Userinfo",
];

export default function GettingStartedDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [authCode, setAuthCode] = useState("");
  const [tokenResponse, setTokenResponse] = useState<any>(null);
  const [decodedIdToken, setDecodedIdToken] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  const theme = useTheme();

  const oidcParams = {
    clientId: "clientSecretBasic2",
    redirectUri: `${frontendUrl}/playground`,
    scope: "openid profile email",
    responseType: "code",
    grantType: "authorization_code",
    authEndpoint: `${process.env.NEXT_PUBLIC_IDP_SERVER_ISSUER}/api/v1/authorizations`,
    tokenEndpoint: `${process.env.NEXT_PUBLIC_IDP_SERVER_ISSUER}/api/v1/tokens`,
    userinfoEndpoint: `${process.env.NEXT_PUBLIC_IDP_SERVER_ISSUER}/api/v1/userinfo`,
    clientSecret: process.env.NEXT_IDP_ADMIN_DASHBOARD_CLIENT_SECRET,
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      setAuthCode(code);
      setLogs([`[Step 2] Authorization Code: ${code}`]);
      setActiveStep(2);
    }
  }, []);

  const logMessage = (message: string) => {
    setLogs((prev) => [...prev, message]);
  };

  const handleNext = () =>
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));

  const StepSection = ({ children }: { children: React.ReactNode }) => (
    <Box
      sx={{
        p: 4,
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
      <Stack spacing={3}>{children}</Stack>
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h5" fontWeight={600} mb={4}>
        OpenID Connect Playground
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Use this playground to simulate OpenID Connect authorization flows,
        inspect tokens, and test client configurations in a sandboxed
        environment.
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box mt={4}>
        {activeStep === 0 && (
          <StepSection>
            <Typography variant="subtitle1">
              Step 1: Authorization Request
            </Typography>
            <CodeSnippet
              title="Authorization Endpoint"
              code={oidcParams.authEndpoint}
              codeLanguage="bash"
            />
            <Box textAlign="right">
              <Button
                variant="contained"
                onClick={() => {
                  const authUrl = `${oidcParams.authEndpoint}?client_id=${oidcParams.clientId}&redirect_uri=${encodeURIComponent(oidcParams.redirectUri)}&response_type=${oidcParams.responseType}&scope=${encodeURIComponent(oidcParams.scope)}`;
                  window.location.href = authUrl;
                  logMessage(`[Step 1] Request Authorization: ${authUrl}`);
                }}
                sx={{ textTransform: "none" }}
              >
                Start Authorization
              </Button>
            </Box>
          </StepSection>
        )}

        {activeStep === 1 && (
          <StepSection>
            <Typography variant="subtitle1">
              Step 2: Authorization Code
            </Typography>
            <CodeSnippet
              title="Authorization Code"
              code={authCode}
              codeLanguage="bash"
            />
            <Box textAlign="right">
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ textTransform: "none" }}
              >
                Continue
              </Button>
            </Box>
          </StepSection>
        )}

        {activeStep === 2 && (
          <StepSection>
            <Typography variant="subtitle1">Step 3: Token Request</Typography>
            <CodeSnippet
              title="Token Endpoint"
              code={oidcParams.tokenEndpoint}
              codeLanguage="bash"
            />
            <Box textAlign="right">
              <Button
                variant="contained"
                onClick={async () => {
                  const response = await fetch("/api/playground/token", {
                    method: "POST",
                    body: JSON.stringify({
                      url: oidcParams.tokenEndpoint,
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                      },
                      body: {
                        client_id: oidcParams.clientId,
                        code: authCode,
                        redirect_uri: oidcParams.redirectUri,
                        grant_type: oidcParams.grantType,
                      },
                    }),
                  });
                  const body = await response.json();
                  setTokenResponse(body);
                  const decoded = decodeJwt(body.id_token);
                  setDecodedIdToken(decoded);
                  logMessage(
                    `[Step 3] Token Response: ${JSON.stringify(body)}`,
                  );
                  handleNext();
                }}
                sx={{ textTransform: "none" }}
              >
                Request Token
              </Button>
            </Box>
          </StepSection>
        )}

        {activeStep === 3 && tokenResponse && (
          <StepSection>
            <Typography variant="subtitle1">Step 4: Token Response</Typography>
            <CodeSnippet
              title="Token Response"
              code={JSON.stringify(tokenResponse, null, 2)}
              codeLanguage="json"
            />
            <Box textAlign="right">
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ textTransform: "none" }}
              >
                Decode ID Token
              </Button>
            </Box>
          </StepSection>
        )}

        {activeStep === 4 && decodedIdToken && (
          <StepSection>
            <Typography variant="subtitle1">Step 5: Decoded IDToken</Typography>
            <CodeSnippet
              title="Decoded IDToken"
              code={JSON.stringify(decodedIdToken, null, 2)}
              codeLanguage="json"
            />
            <Box textAlign="right">
              <Button
                variant="contained"
                onClick={async () => {
                  const response = await fetch("/api/playground/userinfo", {
                    method: "POST",
                    body: JSON.stringify({
                      url: oidcParams.userinfoEndpoint,
                      accessToken: tokenResponse?.access_token,
                    }),
                  });
                  const body = await response.json();
                  setUserInfo(body);
                  logMessage(`[Step 5] Userinfo: ${JSON.stringify(body)}`);
                  handleNext();
                }}
                sx={{ textTransform: "none" }}
              >
                Fetch Userinfo
              </Button>
            </Box>
          </StepSection>
        )}

        {activeStep === 5 && userInfo && (
          <StepSection>
            <Typography variant="subtitle1">
              Step 6: Userinfo Response
            </Typography>
            <CodeSnippet
              title="Userinfo"
              code={JSON.stringify(userInfo, null, 2)}
              codeLanguage="json"
            />
            <Box textAlign="right">
              <Button
                variant="contained"
                onClick={() => setActiveStep(0)}
                sx={{ textTransform: "none" }}
              >
                Reset
              </Button>
            </Box>
          </StepSection>
        )}

        <Box mt={4}>
          <CodeSnippet
            title="Logs"
            code={logs.join("\n")}
            codeLanguage="text"
          />
        </Box>
      </Box>
    </Container>
  );
}
