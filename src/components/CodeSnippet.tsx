import { Box, IconButton, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ContentCopy } from "@mui/icons-material";
import React from "react";

export const CodeSnippet = ({
  title,
  code,
  codeLanguage,
}: {
  title: string;
  code: string;
  codeLanguage: string;
}) => {
  const handleCopy = (codeSnippet: string) => {
    navigator.clipboard.writeText(codeSnippet);
  };

  return (
    <Box position="relative">
      <Typography>{title}</Typography>
      <SyntaxHighlighter language={codeLanguage} style={atomOneDark}>
        {code}
      </SyntaxHighlighter>
      <IconButton
        onClick={() => {
          handleCopy(code);
        }}
        sx={{ position: "absolute", top: 30, right: 8 }}
      >
        <ContentCopy />
      </IconButton>
    </Box>
  );
};
