"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

const SubscriptionCompletePage = () => {
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setSessionId(query.get("session_id") || "session_id");
    }
  }, [sessionId]);

  const handleClick = async () => {
    const { url } = await fetch(`/api/payments/subscription/session/${sessionId}`,
        {
          method: "POST",
          body: JSON.stringify({
            returnUrl: "http://localhost:3000/settings",
          })
        });

    console.log(url);
    // router.push(url);
  }

  return (
    <>
      <Box>
          <Typography variant={"h3"}>Success Subscription</Typography>
          <Typography>{sessionId}</Typography>
        <Button onClick={handleClick}>submit</Button>
      </Box>
    </>
  );
};

export default SubscriptionCompletePage;
