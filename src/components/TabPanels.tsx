import React from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

export type TabElement = {
  label: string;
  node: React.ReactNode;
};

export type TabsProps = {
  elements: TabElement[];
};

export const TabPanels = ({ elements }: TabsProps) => {
  const [showIndex, setShowIndex] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newIndex: number) => {
    console.log(newIndex);
    setShowIndex(newIndex);
  };

  return (
    <Box>
      <TabContext value={showIndex}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {elements.map((element, index) => {
              return <Tab key={index} value={index} label={element.label} />;
            })}
          </TabList>
        </Box>
        {elements.map((element, index) => {
          return (
            <TabPanel key={index} value={index}>
              {element.node}
            </TabPanel>
          );
        })}
      </TabContext>
    </Box>
  );
};
