import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../Layout/AdminSidebar";
import MetaData from "../../Meta/MetaData";
import { Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import { CLEAR_ISDELETED } from "../../store/constants/productConstant";
import { getAllOrders, deleteOrder } from "../../store/actions/orderActions";
import { DataGrid } from "@mui/x-data-grid";
import CustomLoadingOverlay from "../../Layout/CustomLoadingOverlay";
import CustomNoRowsOverlay from "../../Layout/CustomNoRowOverlay";
import Alert from "../../Layout/Alert";
import SuccessAlert from "../../Layout/SuccessAlert";
import DeleteDialog from "../../components/DeleteDialog";

function OrderList() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);

  const { orders, loading } = useSelector((state) => state.allOrders);
  const { isDeleted } = useSelector((state) => state.handleOrder);

  const columns = [
    {
      field: "id",
      headerClassName: "super-app-theme--header",

      headerName: "Order ID",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
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
      headerClassName: "super-app-theme--header",

      type: "number",
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "amount",
      headerName: "Amount",
      headerClassName: "super-app-theme--header",

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
      headerClassName: "super-app-theme--header",

      type: "number",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <Edit />
            </Link>
            <Button
              onClick={() => handleClickOpenDialog(params.row.id)}
              endIcon={<Delete />}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  const handleClickOpenDialog = (id) => {
    setOpen(true);
    setOrderId(id);
  };

  const handleClickDelete = () => {
    dispatch(deleteOrder(orderId));
  };

  const rows = orders?.map((order) => {
    return {
      id: order._id,
      itemsQty: order.orderItems.length,
      amount: order.totalPrice,
      status: order.orderStatus,
    };
  });

  React.useEffect(() => {
    dispatch(getAllOrders());
    if (isDeleted) {
      setOpen(false);
      dispatch({ type: CLEAR_ISDELETED });
    }
  }, [isDeleted]);

  return (
    <React.Fragment>
      <Alert />
      <SuccessAlert />
      <MetaData title="Admin Orders" />
      <AdminSidebar title="All Orders">
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
              "& .super-app-theme--header": {
                backgroundColor: "tomato",
                color: "common.white",
              },
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
              getRowId={(row) => row.id}
              rowsPerPageOptions={[10, 20, 30]}
            />
            <DeleteDialog
              open={open}
              setOpen={setOpen}
              handleClickDelete={handleClickDelete}
              data={`order #${orderId}`}
            />
          </Box>
        </Box>
      </AdminSidebar>
    </React.Fragment>
  );
}

export default OrderList;
