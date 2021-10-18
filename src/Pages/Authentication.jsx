import React from "react";
import { Box, Tabs, AppBar, Tab } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";
import { Login, Register } from "../components";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Alert from "../Layout/Alert";
import MetaData from "../Meta/MetaData";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 5, height: "100%" }}>{children}</Box>}
    </div>
  );
}

function allyProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function Authentication() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const { isAuthenticated } = useSelector((state) => state.user);
  const history = useHistory();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const location = useLocation().search
    ? useLocation().search.split("=")[1]
    : "/account";

  React.useEffect(() => {
    isAuthenticated && history.push(location);
  }, [isAuthenticated, history]);

  return (
    <React.Fragment>
      <MetaData title="LOGIN" />

      <Box
        sx={{
          bgcolor: "lightgray",
          width: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 20,
        }}
      >
        <Box
          sx={{
            width: { xs: "80%", sm: "60%", md: "50%", lg: "30%" },
            height: "60%",
            backgroundColor: "white",
          }}
        >
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              sx={{ backgroundColor: "white" }}
              aria-label="full width tabs example"
            >
              <Tab label="LOGIN" {...allyProps(0)} />
              <Tab label="REGISTER" {...allyProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Login />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <Register />
            </TabPanel>
          </SwipeableViews>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default Authentication;
