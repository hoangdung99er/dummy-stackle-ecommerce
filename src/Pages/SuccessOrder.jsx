import React from "react";
import MetaData from "../Meta/MetaData";
import FailureAlert from "../Layout/FailureAlert";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

function SuccessOrder() {
  const history = useHistory();
  return (
    <React.Fragment>
      <MetaData title="CONGRATULATION!" />
      <Box
        component="div"
        sx={{
          maxWidth: { xs: "98%", sm: "95%" },
          margin: "0 auto",
          display: "flex",
          height: "75vh",
        }}
      >
        <Box sx={{ width: "100%", mt: 10 }}>
          <Box
            sx={{
              width: "100%",
              mt: 4,
              minHeight: "75%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <CheckCircle color="warning" sx={{ width: 80, height: 80 }} />
            <Typography
              align="center"
              sx={{ fontWeight: 600, mt: 1, mb: 2 }}
              variant="h5"
            >
              Your Order has been placed successfully!!!
            </Typography>
            <Button
              onClick={() => history.push("/orders")}
              variant="contained"
              color="success"
            >
              View Orders
            </Button>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default SuccessOrder;
