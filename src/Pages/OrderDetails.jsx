import React from "react";
import MetaData from "../Meta/MetaData";
import FailureAlert from "../Layout/FailureAlert";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, CardContent, Divider, Card } from "@mui/material";
import Loader from "../Layout/Loader";
import { onOrderDetails } from "../store/actions/orderActions";
import { styled } from "@mui/material/styles";

function OrderDetails() {
  const { loading, error, order } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();

  const { id } = useParams();

  React.useEffect(() => {
    dispatch(onOrderDetails(id));
  }, [dispatch, id]);

  const phoneNo = order.shippingInfo && order.shippingInfo.phoneNo;

  const user = order.user && order.user.name;

  const address =
    order.shippingInfo &&
    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`;

  const customOrderStatus =
    order.orderStatus && order.orderStatus === "Delivered" ? "green" : "red";

  return (
    <React.Fragment>
      <MetaData title={`Order #${id}`} />
      <Box
        component="div"
        sx={{
          maxWidth: { xs: "98%", sm: "85%" },
          margin: "0 auto",
          display: "flex",
          minHeight: "75vh",
          bgcolor: "common.white",
        }}
      >
        <Box sx={{ width: "100%", mt: 10, flexGrow: 1 }}>
          <Box
            sx={{
              width: "100%",
              mt: 5,
            }}
          >
            <Box>
              <Typography variant="h3" sx={{ color: "#cc5151" }}>
                Order #{id}
              </Typography>
              <Box sx={{ mt: 3, mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Shipping Info
                </Typography>
                <Box sx={{ ml: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Name:{" "}
                    </Typography>
                    <Typography variant="body2">{user}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Phone:{" "}
                    </Typography>
                    <Typography variant="h5">{phoneNo}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Address:{" "}
                    </Typography>
                    <Typography variant="h5">{address}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Payment
                </Typography>
                <Box sx={{ ml: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Type:{" "}
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }} variant="body1">
                      {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Amount:{" "}
                    </Typography>
                    <Typography variant="h5">
                      {order.totalPrice && order.totalPrice}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Order Status
                </Typography>
                <Box sx={{ ml: 4 }}>
                  <Typography sx={{ color: customOrderStatus }} variant="body1">
                    {order.orderStatus && order.orderStatus}
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ mt: 4 }}>
                <Typography sx={{ fontWeight: 600 }} variant="h5">
                  Order Items
                </Typography>
                <Box sx={{ minHeight: "40vh", overflowY: "auto" }}>
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <Card key={item.product} sx={{ mt: 3 }}>
                        <CardContent
                          sx={{ display: "flex", alignItem: "center" }}
                        >
                          <Box
                            sx={{
                              width: { xs: "50%", sm: "70%" },
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
                              width: { xs: "50%", sm: "30%" },
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

export default OrderDetails;
