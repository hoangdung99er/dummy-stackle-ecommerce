import React from "react";
import AdminSidebar from "../../Layout/AdminSidebar";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Doughnut, Line } from "react-chartjs-2";
import MetaData from "../../Meta/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts } from "../../store/actions/productAction";
import { getAllOrders } from "../../store/actions/orderActions";
import { getAllUsers } from "../../store/actions/userActions";

function Dashboard() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  React.useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, []);

  let outOfStock = 0;

  products?.map((product) => {
    if (product.stock === 0) outOfStock += 1;
  });

  let totalAmount = 0;

  orders?.map((order) => (totalAmount += order.totalPrice));

  const feature = [
    {
      title: "Products",
      quantity: products?.length,
      bgcolor: "tomato",
      color: "common.white",
      to: "/admin/products",
    },
    {
      title: "Orders",
      quantity: orders?.length,
      bgcolor: "#699458",
      color: "common.black",
      to: "/admin/orders",
    },
    {
      title: "Users",
      quantity: users?.length,
      bgcolor: "rgba(0,0,0,0.85)",
      color: "common.white",
      to: "/admin/users",
    },
  ];

  const lineData = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197,72,49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out Of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#00a684", "#680084"],
        hoverBackgroundColor: ["#485000", "#35014F"],
        data: [outOfStock, products?.length - outOfStock],
      },
    ],
  };

  return (
    <React.Fragment>
      <MetaData title="Admin Panel" />
      <AdminSidebar title="Dashboard">
        <Box
          sx={{
            bgcolor: "white",
            display: "flex",
            width: "100%",
            minHeight: "100vh",
            position: "relavtive",
            zIndex: 20,
            flexDirection: "column",
          }}
        >
          <Box sx={{ width: "100%", bgcolor: "#4caaa1" }}>
            <Typography
              align="center"
              color="common.white"
              variant="h5"
              component="div"
            >
              Total Amount <br /> ${totalAmount}
            </Typography>
          </Box>

          <Box sx={{ width: "100%", mt: 4, mb: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {feature.map(({ title, quantity, bgcolor, color, to }, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    bgcolor: bgcolor,
                    position: "relative",
                    mr: { xs: 0, md: 4 },
                    mb: { xs: 4, md: 0 },
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "100%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                    }}
                  >
                    <CustomLink to={to}>
                      <Typography color={color} variant="h5" component="div">
                        {title} <br /> {quantity}
                      </Typography>
                    </CustomLink>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={{ width: "95%", margin: "0 auto", mb: 4 }}>
            <Line data={lineData} />
          </Box>
          <Box sx={{ width: { xs: "50vw", md: "30vw" }, margin: "0 auto" }}>
            <Doughnut data={doughnutState} />
          </Box>
        </Box>
      </AdminSidebar>
    </React.Fragment>
  );
}

const CustomLink = styled(Link)({
  textDecoration: "none",
});

export default Dashboard;
