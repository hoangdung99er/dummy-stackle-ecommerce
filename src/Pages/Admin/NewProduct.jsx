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
import { useHistory } from "react-router-dom";
import MetaData from "../../Meta/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { createProduct } from "../../store/actions/productAction";
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

function NewProduct() {
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.newProduct);
  const history = useHistory();

  const [values, setValues] = React.useState({
    name: "",
    price: 0,
    description: "",
    stock: 0,
    category: "",
  });

  const [images, setImages] = React.useState([]);

  const { name, price, description, stock, category } = values;

  const handleChangeValues = (prop) => (event) => {
    if (prop === "images") {
      const files = Array.from(event.target.files);

      files?.map((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setImages((prev) => [...prev, reader.result]);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setValues({ ...values, [prop]: event.target.value });
    }
  };

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const productData = {
      name,
      price,
      description,
      stock,
      category,
      images,
    };

    dispatch(createProduct(productData));
    setValues({
      name: "",
      price: "",
      description: "",
      stock: 0,
      category: "",
    });
    setImages([]);
  };

  React.useEffect(() => {
    success && history.push("/admin/products");
  }, [success]);

  return (
    <React.Fragment>
      <Alert />
      <SuccessAlert />
      <MetaData title="Create New Product" />
      <AdminSidebar title="Create New Product">
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
            <form onSubmit={createProductSubmitHandler}>
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
                  value={values.price}
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
                  value={values.stock}
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
                  {images &&
                    images.map((image, index) => (
                      <CustomImage key={index} alt="profile" src={image} />
                    ))}
                </Box>
                {images && (
                  <IconButton onClick={() => setImages([])} size="small">
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
                disabled={loading ? true : false}
              >
                {loading ? <LoadingButton /> : "CREATE"}
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

export default NewProduct;
