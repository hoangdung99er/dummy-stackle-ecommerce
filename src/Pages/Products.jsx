import React from "react";
import Loader from "../Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../store/actions/productAction";
import { ProductItem } from "../components";
import {
  Box,
  Grid,
  Typography,
  Divider,
  Pagination,
  Slider,
  Button,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Alert from "../Layout/Alert";

const categories = [
  "Laptop",
  "Smartphone",
  "Shoes",
  "Top-Tank",
  "Camera",
  "Attires",
];

function Products() {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount } = useSelector(
    (state) => state.products
  );

  const { keyword } = useParams();
  const [page, setPage] = React.useState(1);
  const [isOpen, setIsOpen] = React.useState(false);
  const [category, setCategory] = React.useState("");
  const [price, setPrice] = React.useState([0, 25000]);

  React.useEffect(() => {
    dispatch(getAllProduct(keyword, page, price, category));
  }, [dispatch, keyword, page, price, category]);

  const LIMITPERPAGE = 10;

  const paginationCount = Math.ceil(productsCount / LIMITPERPAGE);

  const handleChangePage = (e, value) => {
    setPage(value);
  };

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  const checkTotalProduct = () => {
    if (products?.length >= LIMITPERPAGE) {
      return true;
    }
    return false;
  };

  return (
    <React.Fragment>
      <Alert />
      <Box
        sx={{
          p: {
            xs: "8.5rem 0.75rem 0 0.75rem",
            sm: "8.5rem 0.75rem 0 0.75rem",
          },
        }}
      >
        <Box sx={{ width: "30%", margin: "0 auto", mb: 4 }}>
          <Typography align="center" variant="h5" sx={{ fontWeight: 600 }}>
            Products
          </Typography>
          <Divider />
        </Box>
        {page === 1 && (
          <Button
            onClick={() => setIsOpen((prev) => !prev)}
            variant="outlined"
            color="primary"
          >
            Advanced Search
          </Button>
        )}
        {isOpen && (
          <>
            <Box sx={{ width: "20%", ml: 4, mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Price
              </Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={25000}
              ></Slider>
            </Box>
            <Box sx={{ width: "20%", ml: 4, mb: 4 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Categories
              </Typography>
              <Box sx={{ ml: 4 }}>
                {categories.map((category) => (
                  <Typography
                    sx={{ "&:hover": { color: "tomato", cursor: "pointer" } }}
                    key={category}
                    variant="body2"
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </Typography>
                ))}
              </Box>
            </Box>
          </>
        )}
        {loading ? (
          <Loader fix />
        ) : (
          <>
            <Grid container spacing={4}>
              <Grid xs={12} item>
                <Box
                  sx={{
                    display: "grid",
                    placeContent: "center",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "1fr 1fr",
                      md: "repeat(3 ,1fr)",
                      lg: "repeat(4 ,1fr)",
                    },
                    p: 2,
                    gap: 5,
                  }}
                >
                  {products.length > 0 ? (
                    products.map((product) => (
                      <Link key={product._id} to={`/product/${product._id}`}>
                        <ProductItem product={product} />
                      </Link>
                    ))
                  ) : (
                    <Typography
                      align="center"
                      variant="h5"
                      sx={{ fontWeight: 600, height: "52vh" }}
                    >
                      No Product Found!
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
            {paginationCount > 1 &&
              !keyword &&
              checkTotalProduct() &&
              products?.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 3,
                  }}
                >
                  <Pagination
                    color="primary"
                    shape="rounded"
                    variant="outlined"
                    page={page}
                    onChange={handleChangePage}
                    count={paginationCount}
                  />
                </Box>
              )}
          </>
        )}
      </Box>
    </React.Fragment>
  );
}

export default Products;
