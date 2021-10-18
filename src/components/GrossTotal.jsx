import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useHistory } from "react-router-dom";

function GrossTotal({ cartItems }) {
  const total = cartItems?.reduce(function (prev, item) {
    return prev + item.price * item.quantity;
  }, 0);

  const history = useHistory();

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "45%" },
        p: 2,
        mt: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          mb: { xs: 0, sm: 2 },
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Gross Total</Typography>
        <Typography variant="h4" sx={{ fontWeight: "600", mr: 3 }}>
          {`$${total}`}
        </Typography>
      </Box>
      <Button
        onClick={() => history.push("/login?redirect=shipping")}
        fullWidth
        variant="contained"
        color="primary"
      >
        Checkout
      </Button>
    </Box>
  );
}

export default GrossTotal;
