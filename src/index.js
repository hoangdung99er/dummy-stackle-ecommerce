import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";

const inputGlobalStyles = (
  <GlobalStyles
    styles={{
      "*": {
        scrollBehavior: "smooth",
      },
    }}
  />
);

ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <Router>
      {inputGlobalStyles}
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.Fragment>,
  document.getElementById("root")
);
