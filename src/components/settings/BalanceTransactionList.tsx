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
  Person,
  Email,
  Phone,
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

  const renderBillingDetails = (paymentMethod: PaymentMethod) => {
    const { name, email, phone } = paymentMethod.billingDetails;
    return (
      <>
        {/* Billing Name */}
        {name && (
          <Grid item xs={12} display="flex" alignItems="center" gap={1}>
            <Person fontSize="medium" color="secondary" />
            <Typography variant="body1">
              <strong>Name:</strong> {name}
            </Typography>
          </Grid>
        )}

        {/* Billing Email */}
        {email && (
          <Grid item xs={12} display="flex" alignItems="center" gap={1}>
            <Email fontSize="medium" color="secondary" />
            <Typography variant="body1">
              <strong>Email:</strong> {email}
            </Typography>
          </Grid>
        )}

        {/* Billing Phone */}
        {phone && (
          <Grid item xs={12} display="flex" alignItems="center" gap={1}>
            <Phone fontSize="medium" color="secondary" />
            <Typography variant="body1">
              <strong>Phone:</strong> {phone}
            </Typography>
          </Grid>
        )}

        {/* Billing Address */}
        <Grid item xs={12} display="flex" alignItems="center" gap={1}>
          <Home fontSize="medium" color="secondary" />
          <Typography variant="body1">
            <strong>Billing Address:</strong> {formatAddress(paymentMethod)}
          </Typography>
        </Grid>
      </>
    );
  };

  return (
    <Card sx={{ m: 2, p: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {paymentMethod.type === "card" && renderCardDetails()}
          {paymentMethod.type === "us_bank_account" &&
            renderBankAccountDetails()}
          {renderBillingDetails(paymentMethod)}
        </Grid>
      </CardContent>
    </Card>
  );
};

export const BalanceTransactionList = ({
  transactions,
}: {
  transactions: any[];
}) => {
  const [openItems, setOpenItems] = useState(
    Array(transactions.length).fill(false),
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
        <Typography variant={"h5"}>Balance Transaction</Typography>
      </Box>
      <List>
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          {transactions.map((transaction: any, index: number) => (
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
                    primary={`${transaction.card} - ${transaction}`}
                  />
                  <ListItemText primary={`$`} />
                </Box>
                <Divider light />
                <Collapse
                  in={openItems[index]}
                  timeout="auto"
                  unmountOnExit
                ></Collapse>
              </Box>
            </ListItem>
          ))}
        </Box>
      </List>
    </>
  );
};
