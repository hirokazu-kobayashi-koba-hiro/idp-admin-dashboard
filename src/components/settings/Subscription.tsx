import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { usePayments } from "@/hooks/usePayments";
import { useAtom } from "jotai/index";
import { systemAlertAtom } from "@/state/SystemState";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@/components/ui/Loading";
import { frontendUrl } from "@/app/auth";

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="14px"
    height="16px"
    viewBox="0 0 14 16"
    version="1.1"
  >
    <defs />
    <g id="Flow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g
        id="0-Default"
        transform="translate(-121.000000, -40.000000)"
        fill="#E184DF"
      >
        <path
          d="M127,50 L126,50 C123.238576,50 121,47.7614237 121,45 C121,42.2385763 123.238576,40 126,40 L135,40 L135,56 L133,56 L133,42 L129,42 L129,56 L127,56 L127,50 Z M127,48 L127,42 L126,42 C124.343146,42 123,43.3431458 123,45 C123,46.6568542 124.343146,48 126,48 L127,48 Z"
          id="Pilcrow"
        />
      </g>
    </g>
  </svg>
);

const ProductItem = ({
  priceId,
  name,
  description,
  onClick,
}: {
  priceId: string;
  name: string;
  description: string;
  // eslint-disable-next-line no-unused-vars
  onClick: (priceId: string) => void;
}) => {
  return (
    <Card>
      <CardContent>
        <Logo />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 400,
            margin: "0 auto",
          }}
        >
          <Typography variant={"h5"}>{name}</Typography>
          <Typography variant={"h6"}>{description}</Typography>
          <Button
            onClick={() => {
              onClick(priceId);
            }}
          >
            checkout
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

type PriceItem = {
  priceId: string;
  name: string;
  description: string;
};

export const Subscription = () => {
  const router = useRouter();
  const [, setSystemAlert] = useAtom(systemAlertAtom);
  const { postSessionCreation } = usePayments();
  const { fetchPrices } = usePayments();

  const productId = "prod_RdUaxgZxpFkf6l";
  const successUrl = `${frontendUrl}/settings/subscription/complete`;
  const cancelUrl = `${frontendUrl}/settings/subscription/cancel`;

  const { data, isPending, error } = useQuery({
    queryKey: ["fetchPrices"],
    queryFn: async () => {
      const { payload, error } = await fetchPrices(productId);
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
  console.log(data);

  if (isPending) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  const productItems: PriceItem[] = data;

  return (
    <Grid container spacing={3}>
      {productItems.map((item, index) => {
        return (
          <Grid key={index} item xs={12} md={4}>
            <ProductItem
              priceId={item.priceId}
              name={item.name}
              description={item.description}
              onClick={async (priceId) => {
                const { payload, error } = await postSessionCreation({
                  priceId,
                  successUrl,
                  cancelUrl,
                });
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
                  return;
                }
                console.log(payload.url);
                router.push(payload.url);
              }}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
