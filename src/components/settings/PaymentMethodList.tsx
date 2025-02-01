import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  ExpandMore as ExpandMoreIcon,
  CreditCard,
  AccountBalance,
  Home,
} from "@mui/icons-material";
import { PaymentMethod } from "@/types/payment";

const formatAddress = (paymentMethod: PaymentMethod) => {
  const { address } = paymentMethod.billingDetails;
  if (!address) return "No Address Provided";

  return `${address.line1 || "N/A"}, ${address.city || "N/A"}, ${address.state || "N/A"}, ${address.country || "N/A"} - ${address.postalCode || "N/A"}`;
};

const PaymentMethodCard = ({
  paymentMethod,
}: {
  paymentMethod: PaymentMethod;
}) => {
  const renderCardDetails = () => {
    if (!paymentMethod.card) return null;

    return (
      <>
        {/* Card Brand Display */}
        <Grid item xs={12} display="flex" alignItems="center" gap={1}>
          <CreditCardIcon fontSize="large" color="primary" />
          <Typography variant="h6" fontWeight="bold">
            {paymentMethod.card.brand.toUpperCase()} -{" "}
            {paymentMethod.card.last4}
          </Typography>
        </Grid>

        {/* Basic Information */}
        <Grid item xs={12} md={4}>
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
      </>
    );
  };

  const renderBankAccountDetails = () => {
    if (!paymentMethod.usBankAccount) return null;

    return (
      <>
        {/* Bank Name Display */}
        <Grid item xs={12} display="flex" alignItems="center" gap={1}>
          <AccountBalance fontSize="large" color="primary" />
          <Typography variant="h6" fontWeight="bold">
            {paymentMethod.usBankAccount.bankName} -{" "}
            {paymentMethod.usBankAccount.last4}
          </Typography>
        </Grid>

        {/* Basic Information */}
        <Grid item xs={12} md={4}>
          <Typography variant="body1">
            <strong>Account Type:</strong>{" "}
            {paymentMethod.usBankAccount.accountType.toUpperCase()}
          </Typography>
          <Typography variant="body1">
            <strong>Holder Type:</strong>{" "}
            {paymentMethod.usBankAccount.accountHolderType.toUpperCase()}
          </Typography>
          <Typography variant="body1">
            <strong>Routing Number:</strong>{" "}
            {paymentMethod.usBankAccount.routingNumber}
          </Typography>
        </Grid>

        {/* Supported Networks */}
        <Grid item xs={12}>
          <Chip
            label={`Supported Networks: ${paymentMethod.usBankAccount.networks.supported.join(", ")}`}
            color="primary"
            variant="outlined"
          />
        </Grid>
      </>
    );
  };

  const renderBillingAddress = (paymentMethod: PaymentMethod) => (
    <Grid item xs={12} display="flex" alignItems="center" gap={1}>
      <Home fontSize="large" color="secondary" />
      <Typography variant="body1">
        <strong>Billing Address:</strong> {formatAddress(paymentMethod)}
      </Typography>
    </Grid>
  );

  return (
    <Card sx={{ m: 2, p: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {paymentMethod.type === "card" && renderCardDetails()}
          {paymentMethod.type === "us_bank_account" &&
            renderBankAccountDetails()}
          {renderBillingAddress(paymentMethod)}
        </Grid>
      </CardContent>
    </Card>
  );
};

export const PaymentMethodsList = ({
  paymentMethods,
}: {
  paymentMethods: PaymentMethod[];
}) => {
  const [openItems, setOpenItems] = useState(
    Array(paymentMethods.length).fill(false),
  );

  const handleToggle = (index: number) => {
    setOpenItems((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <>
      <Box mt={4}>
        <Typography variant={"h5"}>Payment Methods</Typography>
      </Box>
      <List>
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          {paymentMethods.map((method: any, index: number) => (
            <ListItem key={index} disableGutters>
              <Box width="100%">
                <Box display="flex" m={2} alignItems="center">
                  <ListItemIcon
                    sx={{ color: "inherit", cursor: "pointer" }}
                    onClick={() => handleToggle(index)}
                  >
                    <ExpandMoreIcon
                      sx={{
                        transform: openItems[index]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.3s",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <CreditCard />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${method.card.brand} - ${method.card.last4}`}
                  />
                  <ListItemText
                    primary={`${method.card.expMonth} / ${method.card.expYear}`}
                  />
                </Box>
                <Divider light />
                <Collapse in={openItems[index]} timeout="auto" unmountOnExit>
                  <PaymentMethodCard paymentMethod={method} />
                </Collapse>
              </Box>
            </ListItem>
          ))}
        </Box>
      </List>
    </>
  );
};
