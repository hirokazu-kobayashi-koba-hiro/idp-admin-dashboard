import React from "react";
import { Card, CardContent, Typography, Grid, Chip, Box } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { SubscriptionDetail } from "@/components/settings/SubscriptionDetail";

const PaymentMethodCard = ({ paymentMethod }: { paymentMethod: any }) => {
  return (
    <Card sx={{ maxWidth: 500, m: 2, p: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* Card Brand Display */}
          <Grid item xs={12} display="flex" alignItems="center" gap={1}>
            <CreditCardIcon fontSize="large" color="primary" />
            <Typography variant="h6" fontWeight="bold">
              {paymentMethod.card.brand.toUpperCase()} -{" "}
              {paymentMethod.card.last4}
            </Typography>
          </Grid>

          {/* Basic Information */}
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Expiration Date:</strong> {paymentMethod.card.expMonth}/
              {paymentMethod.card.expYear}
            </Typography>
            <Typography variant="body1">
              <strong>Type:</strong> {paymentMethod.card.funding.toUpperCase()}
            </Typography>
            <Typography variant="body1">
              <strong>Country:</strong> {paymentMethod.card.country}
            </Typography>
          </Grid>

          {/* 3D Secure Support */}
          <Grid item xs={12}>
            <Chip
              icon={
                paymentMethod.card.threeDSecureUsage.supported ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <CancelIcon color="error" />
                )
              }
              label={
                paymentMethod.card.threeDSecureUsage.supported
                  ? "3D Secure Supported"
                  : "3D Secure Not Supported"
              }
              color={
                paymentMethod.card.threeDSecureUsage.supported
                  ? "success"
                  : "error"
              }
              variant="outlined"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export const Payment = () => {
  const paymentMethod = {
    card: {
      brand: "visa",
      last4: "4242",
      expMonth: 12,
      expYear: 2034,
      funding: "credit",
      country: "US",
      threeDSecureUsage: { supported: true },
    },
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <PaymentMethodCard paymentMethod={paymentMethod} />
      <SubscriptionDetail />
    </Box>
  );
};
