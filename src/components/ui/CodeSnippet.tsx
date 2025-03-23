import {
  Box,
  IconButton,
  Typography,
  useTheme,
  alpha,
  Tooltip,
} from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
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
  const theme = useTheme();

  const handleCopy = async (codeSnippet: string) => {
    await navigator.clipboard.writeText(codeSnippet);
  };

  return (
    <Box
      sx={{
        borderRadius: 3,
        backgroundColor:
          theme.palette.mode === "light"
            ? "#f5f5f7"
            : alpha(theme.palette.common.white, 0.04),
        border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        boxShadow:
          theme.palette.mode === "light"
            ? "0 4px 10px rgba(0,0,0,0.04)"
            : "0 0 0 1px rgba(255,255,255,0.05)",
        p: 2,
        position: "relative",
        overflow: "hidden",
        mb: 3,
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          color: "text.secondary",
          fontWeight: 500,
          mb: 1,
        }}
      >
        {title}
      </Typography>

      <Box sx={{ position: "relative" }}>
        <SyntaxHighlighter
          language={codeLanguage}
          style={atomDark}
          customStyle={{
            borderRadius: 8,
            fontSize: "0.85rem",
            margin: 0,
            padding: "1rem",
            background: theme.palette.mode === "light" ? "#2d2d2d" : "#1e1e1e",
          }}
        >
          {code}
        </SyntaxHighlighter>

        <Tooltip title="Copy">
          <IconButton
            onClick={() => handleCopy(code)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#fff",
              backgroundColor: "rgba(255,255,255,0.1)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)",
              },
            }}
            size="small"
          >
            <ContentCopy fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
