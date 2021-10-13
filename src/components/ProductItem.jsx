import React from "react";
import {
  Rating,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

const styledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

function ProductItem({ product }) {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        "&:hover": { transform: "translateY(-2%)" },
        transition: theme.transitions.create(["all", "transform"], {
          duration: theme.transitions.duration.standard,
          easing: theme.transitions.easing.easeInOut,
        }),
        cursor: "pointer",
      }}
      elevation={3}
    >
      <Card>
        <CardMedia
          height="300"
          src={product.images[0].url}
          alt={product.name}
          component="img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {product.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Rating
              color="error"
              name="half-rating-read-only"
              defaultValue={product.ratings}
              readOnly
              sx={{ "& .MuiRating-iconFilled": { color: "#ff6d75" }, mr: 2 }}
            />
            <Typography variant="body2">
              ({product.numOfReviews}{" "}
              {product.numOfReviews > 1 ? "Reviews" : "Review"})
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, mt: 3, color: "#ff6d75" }}
          >
            {`$${product.price}`}
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
}

export default ProductItem;
