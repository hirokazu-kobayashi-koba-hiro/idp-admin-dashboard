import {
  Card,
  CardContent,
  Typography,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Grid,
} from "@mui/material";
import {
  AccountCircle,
  AttachMoney,
  Receipt,
  CreditCard,
  Event,
  ShoppingCart,
} from "@mui/icons-material";
import React from "react";
import {Loading} from "@/components/Loading";

export const SubscriptionDetail = (props: any) => {
  const { subscription } = props;
  console.log(subscription)
  if (!subscription) return <Loading />

  return (
    <Card
      sx={{
        margin: "auto",
        mt: 4,
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#f9f9f9",
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          color="primary"
          sx={{ fontWeight: "bold", fontSize: { xs: "1.5rem", sm: "2rem" } }}
        >
          Subscription Details
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <ListItem>
              <AccountCircle sx={{ mr: 2 }} />
              <ListItemText
                primary="Subscription ID"
                secondary={subscription.id}
              />
            </ListItem>
            <Divider light />
          </Grid>
          <Grid item xs={12} md={4}>
            <ListItem>
              <CreditCard sx={{ mr: 2 }} />
              <ListItemText
                primary="Status"
                secondary={subscription.status.toUpperCase()}
              />
            </ListItem>
            <Divider light />
          </Grid>
          <Grid item xs={12} md={4}>
            <ListItem>
              <AccountCircle sx={{ mr: 2 }} />
              <ListItemText
                primary="Customer ID"
                secondary={subscription.customer}
              />
            </ListItem>
            <Divider light />
          </Grid>
          <Grid item xs={12} md={4}>
            <ListItem>
              <AttachMoney sx={{ mr: 2 }} />
              <ListItemText
                primary="Currency"
                secondary={subscription.currency.toUpperCase()}
              />
            </ListItem>
            <Divider light />
          </Grid>
          <Grid item xs={12} md={4}>
            <ListItem>
              <Event sx={{ mr: 2 }} />
              <ListItemText
                primary="Billing Cycle"
                secondary={`${subscription.currentPeriodStart} - ${subscription.currentPeriodEnd}`}
              />
            </ListItem>
            <Divider light />
          </Grid>
          <Grid item xs={12} md={4}>
            <ListItem>
              <CreditCard sx={{ mr: 2 }} />
              <ListItemText
                primary="Collection Method"
                secondary={subscription.collectionMethod}
              />
            </ListItem>
            <Divider light />
          </Grid>
          <Grid item xs={12} md={4}>
            <ListItem>
              <Receipt sx={{ mr: 2 }} />
              <ListItemText
                primary="Latest Invoice"
                secondary={subscription.latestInvoice}
              />
            </ListItem>
          </Grid>
        </Grid>
        <Typography variant="h5" sx={{ mt: 3, fontWeight: "bold" }}>
          Items:
        </Typography>
        {subscription.items?.map((item: any) => (
          <Card
            key={item.id}
            sx={{
              mt: 2,
              p: 2,
              borderRadius: 2,
              boxShadow: 2,
              backgroundColor: "#e3f2fd",
              width: "100%",
            }}
          >
            <Box display="flex" alignItems="center">
              <ShoppingCart sx={{ mr: 1 }} />
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                Product ID: {item.plan.product}
              </Typography>
            </Box>
            <Typography variant="body1">
              Price: {item.price.unitAmount}{" "}
              {subscription.currency.toUpperCase()}
            </Typography>
            <Typography variant="body1">Quantity: {item.quantity}</Typography>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};
