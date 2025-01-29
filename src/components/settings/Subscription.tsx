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
  description: string
}

export const Subscription = ({
  items,
  successUrl,
  cancelUrl,
}: {
  items: PriceItem[];
  successUrl: string;
  cancelUrl: string;
}) => {
  const router = useRouter();

  return (
    <Grid container spacing={3}>
      {items.map((item, index) => {
        return (
          <Grid key={index} item xs={12} md={4}>
            <ProductItem
              priceId={item.priceId}
              name={item.name}
              description={item.description}
              onClick={async (priceId) => {
                const response = await fetch(
                  "/api/payments/subscription/session",
                  {
                    method: "POST",
                    body: JSON.stringify({
                      priceId,
                      successUrl,
                      cancelUrl,
                    }),
                  },
                );
                const body = await response.json();
                console.log(body);
                router.push(body.url);
              }}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
