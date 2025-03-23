// components/ui/StyledTabs.tsx
import React from "react";
import { Box, Tabs, Tab, useTheme, alpha } from "@mui/material";

export type TabElement = {
  label: string;
  node: React.ReactNode;
};

export type StyledTabsProps = {
  elements: TabElement[];
};

export const TabPanels = ({ elements }: StyledTabsProps) => {
  const [showIndex, setShowIndex] = React.useState(0);
  const theme = useTheme();

  return (
    <Box>
      {/* Tab List */}
      <Tabs
        value={showIndex}
        onChange={(_, newIndex) => setShowIndex(newIndex)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
          mb: 3,
        }}
      >
        {elements.map((element, index) => (
          <Tab
            key={index}
            label={element.label}
            value={index}
            disableRipple
            sx={{
              textTransform: "none",
              fontWeight: 500,
              fontSize: "0.95rem",
              px: 2,
              color: theme.palette.text.secondary,
              "&.Mui-selected": {
                color: theme.palette.text.primary,
              },
              "&:hover": {
                backgroundColor: alpha(theme.palette.action.hover, 0.05),
              },
            }}
          />
        ))}
      </Tabs>

      {/* Tab Panels */}
      <Box>
        {elements.map((element, index) => (
          <Box
            key={index}
            role="tabpanel"
            hidden={showIndex !== index}
            sx={{ pt: 2 }}
          >
            {showIndex === index && element.node}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
