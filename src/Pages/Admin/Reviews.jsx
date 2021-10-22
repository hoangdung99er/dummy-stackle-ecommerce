import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../Layout/AdminSidebar";
import MetaData from "../../Meta/MetaData";
import { Delete, Star } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import {
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { CLEAR_ISDELETED } from "../../store/constants/productConstant";
import { getAllReviews, deleteReview } from "../../store/actions/productAction";
import { DataGrid } from "@mui/x-data-grid";
import CustomLoadingOverlay from "../../Layout/CustomLoadingOverlay";
import CustomNoRowsOverlay from "../../Layout/CustomNoRowOverlay";
import Alert from "../../Layout/Alert";
import SuccessAlert from "../../Layout/SuccessAlert";
import DeleteDialog from "../../components/DeleteDialog";
import { styled } from "@mui/material/styles";
import LoadingButton from "../../Layout/LoadingButton";

function ProductList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [reviewId, setReviewId] = React.useState(null);
  const [productId, setProductId] = React.useState("");

  const { reviews, error, loading } = useSelector((state) => state.allReviews);
  const { isDeleted } = useSelector((state) => state.handleReviews);

  const columns = [
    {
      field: "id",
      headerClassName: "super-app-theme--header",
      headerName: "Review ID",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "user",
      headerName: "User",
      headerClassName: "super-app-theme--header",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "comment",
      headerName: "Comment",
      headerClassName: "super-app-theme--header",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      headerClassName: "super-app-theme--header",

      type: "number",
      minWidth: 150,
      flex: 0.4,
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Typography
              sx={{
                color: params.row.rating >= 3 ? "green" : "red",
              }}
            >
              {params.row.rating}
            </Typography>
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
    setReviewId(id);
  };

  const handleClickDelete = () => {
    dispatch(deleteReview(reviewId, productId));
  };

  const rows = reviews?.map((review) => {
    return {
      id: review._id,
      user: review.name,
      rating: review.rating,
      comment: review.comment,
    };
  });

  React.useEffect(() => {
    if (productId?.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (isDeleted) {
      setOpen(false);
      history.push("/admin/reviews");
      dispatch({ type: CLEAR_ISDELETED });
    }
  }, [isDeleted, productId]);

  const handleSubmitReviews = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  return (
    <React.Fragment>
      <Alert />
      <SuccessAlert />
      <MetaData title="Review of Product" />
      <AdminSidebar title="Review of Product">
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
            <CustomForm onSubmit={handleSubmitReviews}>
              <Typography
                align="center"
                variant="h6"
                component="div"
                sx={{ fontWeight: 600 }}
              >
                ALL REVIEWS OF A PRODUCT
              </Typography>
              <FormControl sx={{ mt: 4, mb: 4 }} fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-productId">
                  Product ID
                </InputLabel>
                <OutlinedInput
                  startAdornment={
                    <InputAdornment position="start">
                      <Star />
                    </InputAdornment>
                  }
                  id="outlined-adornment-productId"
                  type="text"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  label="Product Id"
                />
              </FormControl>
              <Button
                sx={{ mb: 2 }}
                size="large"
                variant="contained"
                fullWidth
                type="submit"
                color="primary"
                disabled={loading ? true : false}
              >
                {loading ? <LoadingButton /> : "SEARCH"}
              </Button>
            </CustomForm>

            {reviews && reviews.length > 0 ? (
              <>
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
                  data={`review #${reviewId}`}
                />
              </>
            ) : (
              <Typography
                align="center"
                variant="h6"
                component="div"
                sx={{ fontWeight: 600 }}
              >
                NO REVIEWS FOUND!
              </Typography>
            )}
          </Box>
        </Box>
      </AdminSidebar>
    </React.Fragment>
  );
}

const CustomForm = styled("form")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    width: "80%",
  },
  [theme.breakpoints.up("md")]: {
    width: "60%",
  },
  [theme.breakpoints.up("xl")]: {
    width: "60%",
  },
  margin: "0 auto",
}));

export default ProductList;
