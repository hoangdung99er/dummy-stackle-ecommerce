import { Typography, Button, Box } from "@mui/material";
import { Mouse } from "@mui/icons-material";
import { styled, useTheme } from "@mui/material/styles";

import React from "react";

function Home() {
  const theme = useTheme();
  return (
    <React.Fragment>
      <Banner>
        <Typography
          variant="h4"
          sx={{ color: "#fff", mb: 4, textTransform: "uppercase" }}
        >
          Welcome to Stackle E-Commerce
        </Typography>
        <Typography variant="h6" color="inherit">
          FIND AMAZING PRODUCTS BELOW
        </Typography>
        <Box sx={{ width: "100%", mt: 4 }}>
          <Button
            size="large"
            variant="outlined"
            color="inherit"
            startIcon={<Mouse />}
            sx={{
              "&:hover": {
                color: "#ffff",
              },
            }}
            href="#container"
          >
            Scroll
          </Button>
        </Box>
      </Banner>
    </React.Fragment>
  );
}

const Banner = styled("div")(({ theme }) => ({
  display: "flex",
  textAlign: "center",
  flexDirection: "column",
  opacity: 0.8,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export default Home;
