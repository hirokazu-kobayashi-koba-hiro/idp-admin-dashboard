"use client";

import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const SubscriptionPage = () => {
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setSessionId(query.get("session_id") || "session_id");
    }
  }, [sessionId]);

  return (
    <>
      <Box>
        <Typography>{sessionId}</Typography>
      </Box>
    </>
  );
};

export default SubscriptionPage;
