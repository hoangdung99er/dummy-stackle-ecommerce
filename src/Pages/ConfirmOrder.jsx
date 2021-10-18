import React from "react";
import MetaData from "../Meta/MetaData";
import * as types from "../store/constants/cartConstant";
import FailureAlert from "../Layout/FailureAlert";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { saveShippingInfo } from "../store/actions/cartAction";
import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
  Stack,
  Divider,
  CardContent,
  Card,
} from "@mui/material";
import Stepper from "../Layout/Stepper";

function ConfirmOrder() {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce((prev, item) => {
    return prev + item.quantity * item.price;
  }, 0);

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + shippingCharges + tax;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  return (
    <React.Fragment>
      <FailureAlert />
      <MetaData title="CONFIRM ORDER" />
      <Box
        component="div"
        sx={{
          maxWidth: { xs: "98%", sm: "95%" },
          margin: "0 auto",
          display: "flex",
          minHeight: "82vh",
        }}
      >
        <Box sx={{ width: "100%", mt: 10 }}>
          <Stepper activeStep={0} />
          <Box sx={{ width: "100%", mt: 4, minHeight: "90%", display: "flex" }}>
            <Box component="div" sx={{ width: "70%", mr: 2 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h4">Shipping Info</Typography>
                <Stack sx={{ mt: 3, ml: 4 }} direction="column" spacing={4}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={{ fontWeight: 600, mr: 2 }} variant="body1">
                      Name:
                    </Typography>
                    <Typography variant="body2">{user.name}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={{ fontWeight: 600, mr: 2 }} variant="body1">
                      Phone:
                    </Typography>
                    <Typography variant="body2">
                      {shippingInfo.phoneNo}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={{ fontWeight: 600, mr: 2 }} variant="body1">
                      Address:
                    </Typography>
                    <Typography variant="body2">{address}</Typography>
                  </Box>
                </Stack>
              </Box>
              <Divider />
              <Box sx={{ mt: 5 }}>
                <Typography variant="h4">Your Cart Items</Typography>

                <Box sx={{ height: "50vh", overflowY: "auto" }}>
                  {cartItems &&
                    cartItems.map((item) => (
                      <Card key={item.product} sx={{ mt: 3 }}>
                        <CardContent sx={{ display: "flex" }}>
                          <Box
                            sx={{
                              width: { xs: "60%", sm: "70%" },
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <CustomImage src={item.image} alt="Product" />
                            <Link to={`/product/${item.product}`}>
                              <Typography sx={{ ml: 3 }} variant="body1">
                                {item.name}
                              </Typography>
                            </Link>
                          </Box>
                          <Box
                            sx={{
                              width: "30%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Typography variant="body2">
                              {item.quantity} X ${item.price} ={" "}
                            </Typography>
                            <Typography
                              sx={{ fontWeight: 600, ml: 3 }}
                              variant="body1"
                            >
                              ${item.price * item.quantity}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                </Box>
              </Box>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box
              component="div"
              sx={{
                width: { xs: "40%", sm: "30%" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box sx={{ width: "80%" }}>
                <Typography
                  align="center"
                  sx={{ fontWeight: 600, mb: 3 }}
                  variant="h5"
                >
                  Order Summary
                </Typography>
                <Divider />
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mt: 4,
                    }}
                  >
                    <Typography variant="body1">Subtotal:</Typography>
                    <Typography variant="body1">${subtotal}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mt: 4,
                      mb: 4,
                    }}
                  >
                    <Typography variant="body1">Shipping Charges</Typography>
                    <Typography variant="body1">${shippingCharges}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography variant="body1">Tax:</Typography>
                    <Typography variant="body1">${tax}</Typography>
                  </Box>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: 3,
                    mb: 4,
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }} variant="body1">
                    Total:
                  </Typography>
                  <Typography variant="body1">${totalPrice}</Typography>
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  color="warning"
                  fullWidth
                >
                  Proceed To Payment
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}

const CustomImage = styled("img")({
  width: "70px",
  height: "90px",
  objectFit: "cover",
});

export default ConfirmOrder;
