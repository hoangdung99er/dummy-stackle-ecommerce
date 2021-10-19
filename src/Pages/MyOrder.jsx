import React from "react";
import MetaData from "../Meta/MetaData";
import FailureAlert from "../Layout/FailureAlert";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, LinearProgress, Typography } from "@mui/material";
import { Launch } from "@mui/icons-material";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import Loader from "../Layout/Loader";
import { myOrders } from "../store/actions/orderReducer";

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: "absolute", top: 0, width: "100%" }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

function CustomNoRowsOverlay() {
  return (
    <GridOverlay
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        No Rows
      </Typography>
    </GridOverlay>
  );
}

function MyOrder() {
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Typography
              sx={{
                color: params.row.status === "Delivered" ? "green" : "red",
              }}
            >
              {params.row.status}
            </Typography>
          </React.Fragment>
        );
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Typography>${params.row.amount}</Typography>
          </React.Fragment>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <Launch />
          </Link>
        );
      },
    },
  ];

  const rows = orders?.map((order, _) => {
    return {
      itemsQty: order.orderItems.length,
      id: order._id,
      status: order.orderStatus,
      amount: order.totalPrice,
    };
  });

  React.useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  return (
    <React.Fragment>
      <MetaData title={`${user.name}'s Orders`} />
      <Box
        sx={{
          bgcolor: "lightgray",
          position: "fixed",
          width: "100vw",
          maxWidth: "100%",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 20,
        }}
      >
        <Box
          component="div"
          sx={{
            maxWidth: { xs: "92%", sm: "88%" },
            margin: "0 auto",
            display: "flex",
            height: "100vh",
            bgcolor: "common.white",
            flexDirection: "column",
          }}
        >
          <Box sx={{ width: "100%", mt: 10, flexGrow: 1 }}>
            <Box
              sx={{
                width: "100%",
                mt: 5,
                minHeight: "75%",
              }}
            >
              <DataGrid
                components={{
                  LoadingOverlay: CustomLoadingOverlay,
                  NoRowsOverlay: CustomNoRowsOverlay,
                }}
                loading={loading ? true : false}
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
                rowsPerPageOptions={[10, 20, 30]}
              />
            </Box>
          </Box>
          <Box sx={{ bgcolor: "common.black", color: "common.white" }}>
            <Typography variant="h6" align="center">
              {`${user.name}'s Orders`}
            </Typography>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default MyOrder;
