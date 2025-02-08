"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Paper,
  Container,
  Grid,
} from "@mui/material";
import { createBasicAuthHeader } from "@/functions/http";
import { CodeSnippet } from "@/components/CodeSnippet";

const steps = [
  "Authorization Request",
  "Getting AuthorizationCode",
  "Token Request",
  "Getting Token",
  "Decode IDToken",
  "Getting Userinfo",
];

function decode(base64edString: string) {
  const base64 = base64edString.replace(/-/g, "+").replace(/_/g, "/");
  const decodedValue = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join(""),
  );

  return JSON.parse(decodedValue);
}

function decodeJwt(token: string) {
  try {
    const splittedToken = token.split(".");
    const header = decode(splittedToken[0]);
    const payload = decode(splittedToken[1]);
    const signature = splittedToken[2];
    return {
      header: header,
      payload: payload,
      signature: signature,
    };
  } catch (error) {
    return null;
  }
}

function OidcPlayground() {
  const [activeStep, setActiveStep] = useState(0);
  const [oidcParams, setOidcParams] = useState({
    clientId: "clientSecretBasic2",
    redirectUri: "http://localhost:3000/playground",
    scope: "openid profile email",
    responseType: "code",
    grantType: "authorization_code",
    authEndpoint: "http://localhost:8080/123/v1/authorizations",
    tokenEndpoint: "http://localhost:8080/123/api/v1/tokens",
    userinfoEndpoint: "http://localhost:8080/123/api/v1/userinfo",
    clientSecret:
      "clientSecretBasic2cf136dc3c1fc93f31185e5885805d1222333gogoggubaoaugaladufal2cf136dc3c1fc93f31185e5885805d1222333gogoggubaoaugaladufal",
  });

  const [logs, setLogs] = useState([]);
  const [authCode, setAuthCode] = useState("");
  const [tokenResponse, setTokenResponse] = useState<any>(null);
  const [decodedIdToken, setDecodedIdToken] = useState<any>(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      setAuthCode(code);
      setLogs([`[Step 2] authorization code: ${code}`]);
      setActiveStep(2);
    }
  }, [logs.length]);

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const gotoNext = () => {
    if (activeStep === 5) {
      setActiveStep(0);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const logMessage = (message: any) => {
    setLogs((prev) => [...prev, message]);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 1 }}>
      <Typography variant="h4" gutterBottom>
        OpenID Connect Playground
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            {activeStep === 0 && (
              <>
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      const authUrl = `${oidcParams.authEndpoint}?client_id=${oidcParams.clientId}&redirect_uri=${encodeURIComponent(oidcParams.redirectUri)}&response_type=${oidcParams.responseType}&scope=${encodeURIComponent(oidcParams.scope)}`;
                      window.location.href = authUrl;
                      logMessage(`[Step 1] request authorization: ${authUrl}`);
                    }}
                  >
                    Next
                  </Button>
                </Box>
                <CodeSnippet
                  title={"AuthorizationEndpoint"}
                  code={oidcParams.authEndpoint}
                  codeLanguage={"javascript"}
                />
              </>
            )}
            {activeStep === 1 && (
              <>
                <Box>
                  <Button onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      gotoNext();
                    }}
                  >
                    Next
                  </Button>
                </Box>
                <CodeSnippet
                  title={"AuthorizationCode"}
                  code={authCode}
                  codeLanguage={"javascript"}
                />
              </>
            )}
            {activeStep === 2 && (
              <>
                <Box>
                  <Button onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={async () => {
                      const response = await fetch("/api/playground/token", {
                        method: "POST",
                        body: JSON.stringify({
                          url: oidcParams.tokenEndpoint,
                          method: "POST",
                          headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            ...createBasicAuthHeader({
                              username: oidcParams.clientId,
                              password: oidcParams.clientSecret,
                            }),
                          },
                          body: {
                            client_id: oidcParams.clientId,
                            code: authCode || "",
                            redirect_uri: oidcParams.redirectUri,
                            grant_type: oidcParams.grantType,
                          },
                        }),
                      });
                      if (!response.ok) {
                        console.log(response);
                        return;
                      }
                      const body = await response.json();
                      console.log(body);
                      logMessage(`[Step 3] Token : ${JSON.stringify(body)}`);
                      setTokenResponse(body);
                      const idToken = body.id_token;
                      const decodedIdToken = decodeJwt(idToken);
                      setDecodedIdToken(decodedIdToken);
                      gotoNext();
                    }}
                  >
                    Next
                  </Button>
                </Box>
                <CodeSnippet
                  title={"TokenEndpoint"}
                  code={oidcParams.tokenEndpoint}
                  codeLanguage={"json"}
                />
              </>
            )}
            {activeStep === 3 && (
              <>
                <Box>
                  <Button onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      logMessage(
                        `[Step 4] Decoded IDToken : ${JSON.stringify(decodedIdToken)}`,
                      );
                      gotoNext();
                    }}
                  >
                    Next
                  </Button>
                </Box>
                <CodeSnippet
                  title={"TokenResponse"}
                  code={JSON.stringify(tokenResponse, null, 2)}
                  codeLanguage={"json"}
                />
              </>
            )}
            {activeStep === 4 && (
              <>
                <Box>
                  <Button onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={async () => {
                      const response = await fetch("/api/playground/userinfo", {
                        method: "POST",
                        body: JSON.stringify({
                          url: oidcParams.userinfoEndpoint,
                          accessToken: tokenResponse?.access_token,
                        }),
                      });
                      if (!response.ok) {
                        console.log(response);
                        return;
                      }
                      const body = await response.json();
                      setUserInfo(body);
                      logMessage(`[Step 5] Userinfo : ${JSON.stringify(body)}`);
                      gotoNext();
                    }}
                  >
                    Next
                  </Button>
                </Box>
                <CodeSnippet
                  title={"Decoded IDToken"}
                  code={JSON.stringify(decodedIdToken, null, 2)}
                  codeLanguage={"json"}
                />
              </>
            )}
            {activeStep === 5 && (
              <>
                <Box>
                  <Button onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={async () => {
                      gotoNext();
                    }}
                  >
                    Next
                  </Button>
                </Box>
                <CodeSnippet
                  title={"Userinfo"}
                  code={JSON.stringify(userInfo, null, 2)}
                  codeLanguage={"json"}
                />
              </>
            )}
            <Box mt={2}>
              <CodeSnippet
                title={"logs"}
                code={logs.map((log) => log).join("\n")}
                codeLanguage={"array"}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

const GettingStartedDemo = () => {
  return (
    <>
      <Container maxWidth="md" style={{ marginTop: "2rem" }}>
        <OidcPlayground />
      </Container>
    </>
  );
};

export default GettingStartedDemo;
