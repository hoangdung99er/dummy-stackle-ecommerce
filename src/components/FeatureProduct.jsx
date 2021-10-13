import { Typography, Button, Box, Divider } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Products } from "./";
import { Route } from "react-router-dom";

import React from "react";

function Home() {
  const theme = useTheme();
  return (
    <React.Fragment>
      <Box
        component="div"
        id="container"
        sx={{ height: 50, background: "white" }}
      />
      <Box sx={{ background: "white" }}>
        <Box sx={{ maxWidth: "60%", margin: "0 auto" }}>
          <Typography
            variant="h4"
            align="center"
            sx={{ color: "#111", textTransform: "uppercase" }}
          >
            Feature Product
          </Typography>
          <Divider variant="middle" />
        </Box>
        <Products />
      </Box>
    </React.Fragment>
  );
}

export default Home;
