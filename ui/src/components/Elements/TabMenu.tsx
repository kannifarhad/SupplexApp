import { useState } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Paper,
  Box,
  Theme,
  TabProps,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  head: {
    textTransform: "inherit",
    borderTopRightRadius: "5px",
    borderTopLeftRadius: "5px",
  },
  body: {
    // borderBottomRightRadius: "5px",
    // borderBottomLeftRadius: "5px",
    // boxShadow:
    //   "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  },
}));

type a11yProps = {
  id: string;
  "aria-controls": string;
};

function a11yProps(index: number): a11yProps {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

type TabMenu = {
  children: JSX.Element[] | JSX.Element;
  activeTab?: number;
};

function TabMenu(props: TabMenu) {
  const classes = useStyles();
  const { children, activeTab } = props;
  const [value, setValue] = useState<number>(activeTab ? activeTab : 0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Paper>
        <AppBar position="static" className={classes.head}>
          <Tabs
            value={value}
            onChange={handleChange}
            className={classes.body}
            sx={{ "& .MuiTabs-indicator": { backgroundColor: "white" } }}
          >
            {Array.isArray(children) &&
              children.map((item, index) => (
                <Tab
                  key={index}
                  label={item.props.label}
                  style={{ minHeight: "50px", color: "white" }}
                  {...item.props}
                  {...a11yProps(index)}
                />
              ))}
          </Tabs>
        </AppBar>

        {Array.isArray(children) &&
          children.map((item, index) => (
            <TabItemContent
              label={item.props.label}
              key={index}
              value={value}
              index={index}
            >
              {item}
            </TabItemContent>
          ))}
      </Paper>
    </>
  );
}

interface TabItemContentProps {
  children?: JSX.Element[] | JSX.Element | null;
  value?: number;
  index?: number;

  /**
   * Tab menyu olacaq bashliqlar
   */
  label: string;
  iconPosition?: TabProps["iconPosition"];
  icon?: TabProps["icon"];
}

function TabItemContent(props: TabItemContentProps) {
  const { children, value, index, ...rest } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...rest}
    >
      <Box>{children}</Box>
    </Box>
  );
}

export default {
  Tab: TabMenu,
  Item: TabItemContent,
};
