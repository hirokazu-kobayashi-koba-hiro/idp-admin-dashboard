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
import { ExpandMore as ExpandMoreIcon, CreditCard } from "@mui/icons-material";

const PaymentMethodCard = ({ paymentMethod }: { paymentMethod: any }) => {
  return (
    <Card sx={{ m: 2, p: 2, boxShadow: 3, borderRadius: 2 }}>
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
        </Grid>
      </CardContent>
    </Card>
  );
};

export const PaymentMethodsList = ({
  paymentMethods,
}: {
  paymentMethods: any[];
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
