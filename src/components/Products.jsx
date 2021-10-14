import React from "react";
import { Link } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { ProductItem } from "./";
import { useSelector } from "react-redux";
import Loader from "../Layout/Loader";

function Products() {
  const { loading, products, productsCount } = useSelector(
    (state) => state.products
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
              {products &&
                products.map((product) => (
                  <Link key={product._id} to={`/product/${product._id}`}>
                    <ProductItem product={product} />
                  </Link>
                ))}
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default Products;
