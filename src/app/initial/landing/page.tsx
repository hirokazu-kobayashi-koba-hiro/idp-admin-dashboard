"use client";

import React from "react";
import { Container, Typography, Button, Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";
import SecurityIcon from "@mui/icons-material/Security";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { signIn } from "next-auth/react";

const HeroSection = styled(Box)({
  background: "linear-gradient(to right, #1e3c72, #2a5298)",
  color: "white",
  textAlign: "center",
  padding: "100px 0",
});

const StepsSection = styled(Box)({
  background: "#f5f5f5",
  padding: "80px 0",
  textAlign: "center",
});

export default function LandingPage() {
  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <HeroSection>
        <Typography variant="h2" fontWeight="bold">
          Secure & Scalable Identity Provider for Modern Apps
        </Typography>
        <Typography variant="h5" mt={2}>
          The most flexible multi-tenant IdP server with enterprise-grade
          security & seamless integration.
        </Typography>
        <Button
          variant="contained"
          color="error"
          size="large"
          sx={{ mt: 4, textTransform: "none" }}
          onClick={() => {
            signIn(
              "idp-server",
              {
                redirectTo:
                  process.env.NEXT_PUBLIC_IDP_ADMIN_DASHBOARD_INITIAL_CALLBACK,
              },
              {
                prompt: "create",
              },
            );
          }}
        >
          Sign Up
        </Button>
      </HeroSection>

      {/* Features Section */}
      <Box py={8}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={4}>
          Why Choose IdP Server?
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: "Multi-Tenant Architecture",
              desc: "Securely manage multiple organizations with isolated configurations.",
              icon: <CloudSyncIcon fontSize="large" />,
            },
            {
              title: "Extensible User Management",
              desc: "Define custom user attributes and authentication flows.",
              icon: <VerifiedUserIcon fontSize="large" />,
            },
            {
              title: "Enterprise-Grade Security",
              desc: "Zero-trust architecture with advanced security features.",
              icon: <SecurityIcon fontSize="large" />,
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
                {feature.icon}
                <Typography variant="h6" fontWeight="bold" mt={2}>
                  {feature.title}
                </Typography>
                <Typography color="textSecondary">{feature.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Steps Section */}
      <StepsSection>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Get Started in 3 Simple Steps
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              step: "1",
              title: "Sign Up",
              desc: "Create your free account and set up your first tenant.",
              icon: <CheckCircleIcon fontSize="large" />,
            },
            {
              step: "2",
              title: "Configure",
              desc: "Customize authentication and user attributes to match your needs.",
              icon: <CheckCircleIcon fontSize="large" />,
            },
            {
              step: "3",
              title: "Deploy",
              desc: "Integrate seamlessly and start authenticating users.",
              icon: <ArrowForwardIcon fontSize="large" />,
            },
          ].map((step, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
                {step.icon}
                <Typography variant="h6" fontWeight="bold" mt={2}>
                  {step.title}
                </Typography>
                <Typography color="textSecondary">{step.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </StepsSection>

      {/* Call to Action */}
      <Box py={8} textAlign="center" bgcolor="primary.main" color="white">
        <Typography variant="h4" fontWeight="bold" mb={2}>
          Contributing
        </Typography>
        <Typography variant="body1" mb={3}>
          Interested in helping out with IdP Server? Great! Your participation
          in the community is much appreciated! Please feel free to open issues
          and send pull-requests.
        </Typography>
        <Button
          variant="contained"
          color="error"
          size="large"
          href="https://github.com/hirokazu-kobayashi-koba-hiro/idp-server"
          target={"_blank"}
          sx={{
            textTransform: "none",
          }}
        >
          Contribute
        </Button>
      </Box>

      {/* Footer */}
      <Box textAlign="center" py={4}>
        <Typography variant="body2" color="textSecondary">
          &copy; {new Date().getFullYear()} IdP Server. All Rights Reserved.
        </Typography>
      </Box>
    </Container>
  );
}
