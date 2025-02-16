import React, { useState } from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon, CreditCard } from "@mui/icons-material";

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
