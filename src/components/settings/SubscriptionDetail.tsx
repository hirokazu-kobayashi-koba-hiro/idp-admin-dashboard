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

import { useAtom } from "jotai/index";
import { systemAlertAtom } from "@/state/SystemState";
import { usePayments } from "@/hooks/usePayments";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@/components/Loading";
import React from "react";
import { useSession } from "next-auth/react";

export const SubscriptionDetail = () => {
  const [, setSystemAlert] = useAtom(systemAlertAtom);
  const { fetchSubscriptionDetail } = usePayments();
  const { data: session } = useSession();
  console.log("session", session);
  const subscriptionId = session?.user.subscriptionId || "";

  const {
    data: subscription,
    isPending,
    error,
  } = useQuery({
    queryKey: ["fetchSubscriptionDetail"],
    queryFn: async () => {
      const { payload, error } = await fetchSubscriptionDetail(subscriptionId);
      if (!payload && error) {
        setSystemAlert({
          open: true,
          title: "error",
          body: null,
          onClickPositiveButton: () => {
            console.log("onClickPositiveButton");
          },
          onClickNegativeButton: () => {
            console.log("onClickNegativeButton");
          },
        });
        throw new Error("Network response was not ok");
      }
      return payload;
    },
  });
  console.log(subscription);

  if (isPending) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  if (!subscription) return <div>not found</div>;

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
