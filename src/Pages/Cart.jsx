import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { RemoveShoppingCart } from "@mui/icons-material";
import { CartItemCard, GrossTotal } from "../components";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../Meta/MetaData";
import SuccessAlert from "../Layout/SuccessAlert";
import { useHistory } from "react-router-dom";

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const history = useHistory();

  return (
    <React.Fragment>
      <SuccessAlert />
      <MetaData title="YOUR CART" />

      <Box
        component="div"
        sx={{
          maxWidth: { xs: "100%", sm: "80%" },
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          minHeight: "75vh",
        }}
      >
        <Box
          sx={{
            mt: { xs: 7, sm: 10 },
            width: "100%",
            minHeight: "56vh",
            //   height: "56vh",
          }}
        >
          {cartItems?.length > 0 ? (
            <>
              <Box
                component="div"
                sx={{
                  width: "100%",
                  height: 40,
                  bgcolor: "tomato",
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                }}
              >
                <Box
                  component="div"
                  sx={{ width: { xs: "38%", md: "48%", lg: "60%" }, ml: 1 }}
                >
                  <Typography variant="body2">Product</Typography>
                </Box>

                <Box sx={{ width: "14%", flexGrow: 1 }}>
                  <Typography align="center" variant="body2">
                    Quantity
                  </Typography>
                </Box>
                <Box sx={{ width: "26%", justifyItems: "flex-end" }}>
                  <Typography align="center" variant="body2">
                    Subtotal
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  overflowY: "auto",
                  width: "100%",
                  height: "53vh",
                  // minHeight: "53vh",
                }}
              >
                {cartItems &&
                  cartItems.map((item) => (
                    <CartItemCard key={item.product} item={item} />
                  ))}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <GrossTotal cartItems={cartItems} />
              </Box>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <RemoveShoppingCart />
              <Typography align="center" variant="h6" sx={{ fontWeight: 600 }}>
                NO PRODUCT IN CART
              </Typography>
              <Button
                onClick={() => history.push("/products")}
                variant="contained"
              >
                View Products
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default Cart;
