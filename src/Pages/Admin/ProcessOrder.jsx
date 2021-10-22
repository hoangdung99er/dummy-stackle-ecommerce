import React from "react";
import MetaData from "../../Meta/MetaData";
import { CLEAR_ISUPDATED } from "../../store/constants/orderConstant";
import FailureAlert from "../../Layout/FailureAlert";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
  Stack,
  Divider,
  CardContent,
  Card,
  FormControl,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { onOrderDetails, updateOrder } from "../../store/actions/orderActions";
import { Category } from "@mui/icons-material";
import LoadingButton from "../../Layout/LoadingButton";
import SuccessAlert from "../../Layout/SuccessAlert";
import Alert from "../../Layout/Alert";
import AdminSidebar from "../../Layout/AdminSidebar";

function ProcessOrder() {
  const { order } = useSelector((state) => state.orderDetails);
  const { isUpdated, loading } = useSelector((state) => state.handleOrder);
  const dispatch = useDispatch();
  const orderId = useParams().id;
  const history = useHistory();

  const [processType, setProcessType] = React.useState("");

  const customOrderStatus =
    order.orderStatus && order.orderStatus === "Delivered" ? "green" : "red";

  const handleSubmitProcess = (e) => {
    e.preventDefault();

    dispatch(updateOrder(orderId, processType));
  };

  React.useEffect(() => {
    if (isUpdated) {
      history.push("/admin/orders");
      dispatch({ type: CLEAR_ISUPDATED });
    }
    dispatch(onOrderDetails(orderId));
  }, [dispatch, isUpdated, orderId, history]);

  return (
    <React.Fragment>
      <Alert />
      <SuccessAlert />
      <MetaData title={`Update Order #${orderId}`} />
      <AdminSidebar title="Update Order">
        <Box
          sx={{
            bgcolor: "white",
            display: "flex",
            width: "100%",
            minHeight: "100vh",
            position: "relavtive",
            flexDirection: "column",
          }}
        >
          <Box
            component="div"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
            }}
          >
            <Box
              component="div"
              sx={{
                width: { xs: "90%", md: "70%" },
                mr: 2,
                ml: 2,
                flexGrow: order?.orderStatus === "Delivered" && 1,
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h4">Shipping Info</Typography>
                  <Stack sx={{ mt: 3, ml: 4 }} direction="column" spacing={4}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        sx={{ fontWeight: 600, mr: 2 }}
                        variant="body1"
                      >
                        Name:
                      </Typography>
                      <Typography variant="body2">
                        {order?.user?.name}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        sx={{ fontWeight: 600, mr: 2 }}
                        variant="body1"
                      >
                        Phone:
                      </Typography>
                      <Typography variant="body2">
                        {order?.shippingInfo?.phoneNo}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        sx={{ fontWeight: 600, mr: 2 }}
                        variant="body1"
                      >
                        Address:
                      </Typography>
                      <Typography variant="body2">
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </Typography>
                    </Box>
                  </Stack>
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
                    <Typography
                      sx={{ color: customOrderStatus }}
                      variant="body1"
                    >
                      {order.orderStatus && order.orderStatus}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ mt: 5 }}>
                <Typography variant="h4">Order Items</Typography>
                <Box sx={{ minHeight: "20vh", overflowY: "auto" }}>
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <Card key={item.product} sx={{ mt: 3 }}>
                        <CardContent sx={{ display: "flex" }}>
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
            {order?.orderStatus !== "Delivered" && (
              <>
                <Divider orientation="vertical" flexItem />
                <Box
                  component="div"
                  sx={{
                    width: { xs: "90%", md: "30%" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "80%",
                      display:
                        order.orderStatus === "Delivered" ? "none" : "block",
                    }}
                  >
                    <form onSubmit={handleSubmitProcess}>
                      <FormControl fullWidth variant="outlined">
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: 600 }}
                          align="center"
                        >
                          Process Order
                        </Typography>
                        <Select
                          labelId="category-select-status"
                          id="category-select"
                          value={processType}
                          label="Status"
                          startAdornment={
                            <InputAdornment position="start">
                              <Category />
                            </InputAdornment>
                          }
                          onChange={(e) => setProcessType(e.target.value)}
                        >
                          <MenuItem value="">Choose Process</MenuItem>
                          {order.orderStatus === "Processing" && (
                            <MenuItem value="Shipped">Shipped</MenuItem>
                          )}
                          {order.orderStatus === "Shipped" && (
                            <MenuItem value="Delivered">Delivered</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                      <Button
                        sx={{ mt: 2 }}
                        size="large"
                        variant="contained"
                        fullWidth
                        type="submit"
                        color="primary"
                        disabled={loading ? true : false}
                      >
                        {loading ? <LoadingButton /> : "PROCESS"}
                      </Button>
                    </form>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </AdminSidebar>
    </React.Fragment>
  );
}

const CustomImage = styled("img")({
  width: "70px",
  height: "90px",
  objectFit: "cover",
});

export default ProcessOrder;
