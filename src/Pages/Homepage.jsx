import React from "react";
import { Box } from "@mui/material";
import { Home, FeatureProduct } from "../components";
import MetaData from "../Meta/MetaData";
import { getAllProduct } from "../store/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../Layout/Alert";

function Homepage() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.products);
  React.useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  return (
    <>
      <MetaData title="STACKLE E-COMMERCE" />
      <Box
        sx={{
          background: "linear-gradient(to right, #635dc0, #3027ae)",
          mt: { xs: 7, sm: 7 },
        }}
      >
        <Box
          sx={{
            padding: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "93vh",
            position: "relative",
            "&::after": {
              content: '""',
              width: "100vw",
              height: "100%",
              background: "#ffff",
              position: "absolute",
              top: 0,
              left: 0,
              clipPath: "polygon(100% 68%, 0 100%, 100% 100%)",
              maxWidth: "100%",
            },
          }}
        >
          <Home />
        </Box>
        <Alert />
        <FeatureProduct />
      </Box>
    </>
  );
}

export default Homepage;
