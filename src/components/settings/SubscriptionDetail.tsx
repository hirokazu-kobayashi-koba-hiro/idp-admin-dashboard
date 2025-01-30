import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
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
      if (error) {
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

  return (
    <Card
      sx={{
        maxWidth: { xs: "90%", sm: 700 },
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
        <List>
          <ListItem>
            <AccountCircle sx={{ mr: 2 }} />
            <ListItemText
              primary="Subscription ID"
              secondary={subscription.id}
            />
          </ListItem>
          <Divider light />
          <ListItem>
            <CreditCard sx={{ mr: 2 }} />
            <ListItemText
              primary="Status"
              secondary={subscription.status.toUpperCase()}
            />
          </ListItem>
          <Divider light />
          <ListItem>
            <AccountCircle sx={{ mr: 2 }} />
            <ListItemText
              primary="Customer ID"
              secondary={subscription.customer}
            />
          </ListItem>
          <Divider light />
          <ListItem>
            <AttachMoney sx={{ mr: 2 }} />
            <ListItemText
              primary="Currency"
              secondary={subscription.currency.toUpperCase()}
            />
          </ListItem>
          <Divider light />
          <ListItem>
            <Event sx={{ mr: 2 }} />
            <ListItemText
              primary="Billing Cycle"
              secondary={`${new Date(subscription.current_period_start * 1000).toLocaleDateString()} - ${new Date(subscription.current_period_end * 1000).toLocaleDateString()}`}
            />
          </ListItem>
          <Divider light />
          <ListItem>
            <CreditCard sx={{ mr: 2 }} />
            <ListItemText
              primary="Collection Method"
              secondary={subscription.collection_method}
            />
          </ListItem>
          <Divider light />
          <ListItem>
            <Receipt sx={{ mr: 2 }} />
            <ListItemText
              primary="Latest Invoice"
              secondary={subscription.latest_invoice}
            />
          </ListItem>
        </List>
        <Typography variant="h5" sx={{ mt: 3, fontWeight: "bold" }}>
          Items:
        </Typography>
        {subscription.items?.data.map((item: any) => (
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
              Price: {item.price.unit_amount / 100}{" "}
              {subscription.currency.toUpperCase()}
            </Typography>
            <Typography variant="body1">Quantity: {item.quantity}</Typography>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};
