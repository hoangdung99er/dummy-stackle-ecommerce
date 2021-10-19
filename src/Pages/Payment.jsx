import React from "react";
import MetaData from "../Meta/MetaData";
import FailureAlert from "../Layout/FailureAlert";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import { CreditCard, Event, VpnKey } from "@mui/icons-material";
import LoadingButton from "../Layout/LoadingButton";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createOrder } from "../store/actions/orderReducer";
import Stepper from "../Layout/Stepper";
import { FetchAPI } from "../store/lib/callApi";
import useResponsiveFontSize from "../useReponsiveFont";

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = React.useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    [fontSize]
  );

  return options;
};

function ConfirmOrder() {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  const options = useOptions();
  const payBtn = React.useRef(null);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.newOrder);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const paymentProcessHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        "Content-Type": "application/json",
      };
      const { responseData } = await FetchAPI(
        "/payment/process",
        "POST",
        paymentData,
        config
      );

      const client_secret = responseData.client_secret;

      if (!stripe || !elements) return;

      const payload = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (payload.error) {
        payBtn.current.disabled = false;

        return <FailureAlert />;
      } else {
        if (payload.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: payload.paymentIntent.id,
            status: payload.paymentIntent.status,
          };

          dispatch(createOrder(order));

          history.push("/order/success");
        } else {
          return <FailureAlert />;
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;

      return <FailureAlert />;
    }
  };

  return (
    <React.Fragment>
      <FailureAlert />
      <MetaData title="PROCESS PAYMENT" />
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
          <Stepper activeStep={2} />
          <Box
            sx={{
              width: "100%",
              mt: 4,
              minHeight: "75%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CustomForm onSubmit={paymentProcessHandler}>
              <Typography variant="h4" sx={{ color: "#a79f9f", mb: 4 }}>
                Card Info
              </Typography>
              <Box sx={{ width: "100%" }} component="div">
                <CreditCard />
                <CardNumberElement
                  style={{ border: "1px solid gray" }}
                  options={options}
                />
              </Box>
              <Box sx={{ width: "100%", mb: 4, mt: 4 }} component="div">
                <Event />
                <CardExpiryElement options={options} />
              </Box>
              <Box sx={{ width: "100%", mb: 4 }} component="div">
                <VpnKey />
                <CardCvcElement options={options} />
              </Box>
              <Button
                type="submit"
                size="large"
                variant="contained"
                fullWidth
                color="primary"
                ref={payBtn}
              >
                {loading ? (
                  <LoadingButton />
                ) : (
                  ` Pay $${orderInfo && orderInfo.totalPrice}`
                )}
              </Button>
            </CustomForm>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}

const CustomForm = styled("form")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    width: "50%",
  },
  [theme.breakpoints.up("xs")]: {
    widh: "80%",
  },
  height: "85%",
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
}));

export default ConfirmOrder;
