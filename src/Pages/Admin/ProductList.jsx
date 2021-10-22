import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../Layout/AdminSidebar";
import MetaData from "../../Meta/MetaData";
import { Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import { CLEAR_ISDELETED } from "../../store/constants/productConstant";
import {
  getAdminProducts,
  deleteProduct,
} from "../../store/actions/productAction";
import { CREAT_PRODUCT_DETAILS_AFTER_UPDATE } from "../../store/constants/productConstant";
import { DataGrid } from "@mui/x-data-grid";
import CustomLoadingOverlay from "../../Layout/CustomLoadingOverlay";
import CustomNoRowsOverlay from "../../Layout/CustomNoRowOverlay";
import Alert from "../../Layout/Alert";
import SuccessAlert from "../../Layout/SuccessAlert";
import DeleteDialog from "../../components/DeleteDialog";

function ProductList() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [productId, setProductId] = React.useState(null);

  const { products, error, loading } = useSelector((state) => state.products);
  const { isDeleted } = useSelector((state) => state.handleProduct);

  const columns = [
    {
      field: "id",
      headerClassName: "super-app-theme--header",

      headerName: "Product ID",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Product Name",
      headerClassName: "super-app-theme--header",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      headerClassName: "super-app-theme--header",

      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      headerClassName: "super-app-theme--header",

      type: "number",
      minWidth: 270,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Typography>${params.row.price}</Typography>
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
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
    console.log(id);
    setOpen(true);
    setProductId(id);
  };

  const handleClickDelete = () => {
    dispatch(deleteProduct(productId));
  };

  const rows = products?.map((product) => {
    return {
      id: product._id,
      stock: product.stock,
      price: product.price,
      name: product.name,
    };
  });

  React.useEffect(() => {
    dispatch({ type: CREAT_PRODUCT_DETAILS_AFTER_UPDATE });
  }, []);

  React.useEffect(() => {
    dispatch(getAdminProducts());
    if (isDeleted) {
      setOpen(false);
      dispatch({ type: CLEAR_ISDELETED });
    }
  }, [isDeleted]);

  return (
    <React.Fragment>
      <Alert />
      <SuccessAlert />
      <MetaData title="Admin Products" />
      <AdminSidebar title="All Products">
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
              data={`product #${productId}`}
            />
          </Box>
        </Box>
      </AdminSidebar>
    </React.Fragment>
  );
}

export default ProductList;
