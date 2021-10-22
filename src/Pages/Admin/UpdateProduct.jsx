import React from "react";
import AdminSidebar from "../../Layout/AdminSidebar";
import {
  Box,
  TextField,
  Input,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Avatar,
  IconButton,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import {
  AttachMoney,
  Spellcheck,
  Pageview,
  Storage,
  Cancel,
  Category,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useHistory, useParams } from "react-router-dom";
import MetaData from "../../Meta/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { CLEAR_ISUPDATED } from "../../store/constants/productConstant";
import {
  getProductDetails,
  updateProduct,
} from "../../store/actions/productAction";
import LoadingButton from "../../Layout/LoadingButton";
import Alert from "../../Layout/Alert";
import SuccessAlert from "../../Layout/SuccessAlert";

const categories = [
  "Laptop",
  "Smartphone",
  "Shoes",
  "Top-Tank",
  "Camera",
  "Attires",
];

function UpdateProduct() {
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.newProduct);
  const { loading: updateLoading, isUpdated } = useSelector(
    (state) => state.handleProduct
  );
  const history = useHistory();
  const { product } = useSelector((state) => state.productDetails);
  const productId = useParams().id;

  const [values, setValues] = React.useState({
    name: "",
    price: 0,
    description: "",
    stock: 0,
    category: "",
  });

  const [images, setImages] = React.useState([]);
  const [oldImages, setOldImages] = React.useState([]);
  const [imagesPreview, setImagesPreview] = React.useState([]);

  const { name, price, description, stock, category } = values;

  const handleChangeValues = (prop) => (event) => {
    if (prop === "images") {
      const files = Array.from(event.target.files);
      setOldImages([]);

      files?.map((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setImages((prev) => [...prev, reader.result]);
            setImagesPreview((prev) => [...prev, reader.result]);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setValues({ ...values, [prop]: event.target.value });
    }
  };

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const productData = {
      name,
      price,
      description,
      stock,
      category,
      images,
    };

    dispatch(updateProduct(productId, productData));
  };

  React.useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setValues({
        ...values,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
      });
      setOldImages(product.images);
    }

    if (isUpdated) {
      history.push("/admin/products");
      dispatch({ type: CLEAR_ISUPDATED });
    }
  }, [isUpdated, product, productId, dispatch, history]);

  return (
    <React.Fragment>
      <Alert />
      <SuccessAlert />
      <MetaData title={`Update #${productId}`} />
      <AdminSidebar title="Update Product">
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
          <Box component="div" sx={{ width: "80%", margin: "0 auto" }}>
            <form onSubmit={updateProductSubmitHandler}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-name">
                  Product Name
                </InputLabel>
                <OutlinedInput
                  startAdornment={
                    <InputAdornment position="start">
                      <Spellcheck />
                    </InputAdornment>
                  }
                  id="outlined-adornment-name"
                  type="text"
                  value={values.name}
                  onChange={handleChangeValues("name")}
                  label="Product Name"
                />
              </FormControl>
              <FormControl sx={{ mt: 4 }} fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-price">
                  Price
                </InputLabel>
                <OutlinedInput
                  startAdornment={
                    <InputAdornment position="start">
                      <AttachMoney />
                    </InputAdornment>
                  }
                  id="outlined-adornment-price"
                  type="number"
                  value={Number(values.price)}
                  onChange={handleChangeValues("price")}
                  label="Price"
                />
              </FormControl>
              <FormControl sx={{ mt: 4 }} fullWidth>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  columns={10}
                  variant="outlined"
                  value={values.description}
                  onChange={handleChangeValues("description")}
                />
              </FormControl>
              <FormControl sx={{ mt: 4 }} fullWidth variant="outlined">
                <InputLabel htmlFor="category-select-label">
                  Choose Category
                </InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  value={values.category}
                  label="Category"
                  startAdornment={
                    <InputAdornment position="start">
                      <Category />
                    </InputAdornment>
                  }
                  onChange={handleChangeValues("category")}
                >
                  {categories.map((cate) => (
                    <MenuItem key={cate} value={cate}>
                      {cate}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ mt: 4 }} fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-stock">
                  Stock
                </InputLabel>
                <OutlinedInput
                  startAdornment={
                    <InputAdornment position="start">
                      <Storage />
                    </InputAdornment>
                  }
                  id="outlined-adornment-stock"
                  type="number"
                  value={Number(values.stock)}
                  onChange={handleChangeValues("stock")}
                  label="Stock"
                />
              </FormControl>
              <Box sx={{ display: "flex", mt: 4, mb: 4, alignItems: "center" }}>
                <label htmlFor="icon-button-images">
                  Choose Product Images
                  <Input
                    sx={{ display: "none" }}
                    accept="image/*"
                    id="icon-button-images"
                    type="file"
                    onChange={handleChangeValues("images")}
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <Pageview />
                  </IconButton>
                </label>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {oldImages &&
                    oldImages.map((image, index) => (
                      <CustomImage key={index} alt="profile" src={image.url} />
                    ))}
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {imagesPreview.map((image, index) => (
                    <CustomImage key={index} alt="profile" src={image} />
                  ))}
                </Box>
                {oldImages && (
                  <IconButton
                    onClick={() => {
                      setImagesPreview([]);
                      setOldImages([]);
                    }}
                    size="small"
                  >
                    <Cancel />
                  </IconButton>
                )}
              </Box>
              <Button
                sx={{ mt: 2 }}
                size="large"
                variant="contained"
                fullWidth
                type="submit"
                color="primary"
                disabled={updateLoading ? true : false}
              >
                {updateLoading ? <LoadingButton /> : "UPDATE"}
              </Button>
            </form>
          </Box>
        </Box>
      </AdminSidebar>
    </React.Fragment>
  );
}

const CustomImage = styled("img")({
  width: "60px",
  height: "60px",
  objectFit: "cover",
  marginLeft: "12px",
});

export default UpdateProduct;
