import React from "react";
import {
  Box,
  Typography,
  Rating,
  Card,
  CardContent,
  CardActions,
  IconButton,
  TextField,
  Button,
  Divider,
  Skeleton,
  Stack,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../store/actions/productAction";
import { useParams } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";
import Loader from "../Layout/Loader";
import Alert from "../Layout/Alert";
import SuccessAlert from "../Layout/SuccessAlert";
import { styled } from "@mui/material/styles";
import { ReviewCard } from "../components";
import MetaData from "../Meta/MetaData";
import { addItemsToCart } from "../store/actions/cartAction";

function ProductDetails({ match }) {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const [quantity, setQuantity] = React.useState(1);

  React.useEffect(() => {
    dispatch(getProductDetails(match.params.id));
  }, [dispatch]);

  const increaseQuantity = () => {
    if (product?.stock <= quantity) {
      return;
    }
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity((prev) => prev - 1);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
  };

  const handleChangeQuantity = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <React.Fragment>
      <Alert />
      <SuccessAlert />

      {!loading && <MetaData title={`${product?.name}`} />}
      <Box
        sx={{
          background: "rgb(214,214,214)",
          width: "100%",
        }}
        component="div"
      >
        <Box
          sx={{
            p: {
              xs: "8rem 0.75rem 0 0.75rem",
              sm: "8rem 0.75rem 0 0.75rem",
            },
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
          }}
        >
          {loading ? (
            <Box sx={{ mb: 4 }}>
              <Skeleton
                variant="rectangular"
                width={650}
                height={500}
                animation="wave"
              />
            </Box>
          ) : (
            <CustomImageBox>
              <Carousel fullHeightHover>
                {product?.images &&
                  product.images.map((item, i) => (
                    <CustomImage
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </CustomImageBox>
          )}

          {loading ? (
            <Box
              sx={{ width: { xs: "90%", md: "40%" }, ml: { xs: 3, md: 10 } }}
            >
              <Card sx={{ p: 2, mb: 3 }}>
                <Stack spacing={2}>
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton variant="text" animation="wave" />
                  <Divider />
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton variant="text" animation="wave" />
                  <Divider />
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton variant="text" animation="wave" />
                  <Divider />
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton variant="text" animation="wave" />
                </Stack>
              </Card>
            </Box>
          ) : (
            <Card sx={{ p: 2, mb: 3 }}>
              <CardContent>
                <Typography gutterBottom variant="h3">
                  {product?.name}
                </Typography>
                <Typography variant="body1">
                  Product # {product?._id}
                </Typography>
              </CardContent>
              <Divider />
              <CardContent>
                <Rating
                  color="error"
                  name="half-rating-read-only"
                  defaultValue={product?.ratings}
                  readOnly
                  sx={{
                    "& .MuiRating-iconFilled": { color: "#ff6d75" },
                    mr: 2,
                  }}
                />
                <Typography variant="body2" gutterBottom>
                  ({product?.numOfReviews}{" "}
                  {product?.numOfReviews > 1 ? "Reviews" : "Review"})
                </Typography>
                <Typography
                  color={product?.stock < 1 ? "error.dark" : "success.main"}
                  variant="body2"
                  sx={{ fontWeight: 600 }}
                >
                  {product?.stock < 1
                    ? "Out Of Stock"
                    : product?.stock < 10
                    ? `${product?.stock} remain in stock`
                    : "Available in stock"}
                </Typography>
              </CardContent>
              <Divider />
              <CardContent>
                <Typography variant="h4">{`$${product?.price}`}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <CardActions
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      size="small"
                      edge="start"
                      color="inherit"
                      aria-label="add quantity"
                      onClick={decreaseQuantity}
                    >
                      <Remove />
                    </IconButton>
                    <TextField
                      id="standard-number"
                      label="Quantity"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      size="small"
                      sx={{ width: "40%", margin: "0 6px" }}
                      InputProps={{
                        inputProps: {
                          min: 1,
                          max: product?.stock,
                        },
                        readOnly: true,
                      }}
                      value={quantity}
                      onChange={handleChangeQuantity}
                    />

                    <IconButton
                      size="small"
                      edge="start"
                      color="inherit"
                      aria-label="add quantity"
                      onClick={increaseQuantity}
                    >
                      <Add />
                    </IconButton>
                  </CardActions>
                  <Button
                    onClick={addToCartHandler}
                    size="large"
                    variant="contained"
                  >
                    Add To Cart
                  </Button>
                </Box>
              </CardContent>
              <Divider />
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Description :{" "}
                  <Typography variant="body2">{product.description}</Typography>
                </Typography>
                <Button
                  fullWidth
                  sx={{ backgroundColor: "tomato" }}
                  size="large"
                  variant="contained"
                >
                  Submit Review
                </Button>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
      <Box>
        <Box sx={{ maxWidth: "80%", margin: "0 auto", mt: 4 }}>
          <Typography
            align="center"
            sx={{ fontWeigth: "600" }}
            gutterBottom
            variant="h4"
          >
            REVIEWS
          </Typography>
          <Divider />
        </Box>
        {loading ? (
          <Loader />
        ) : (
          <>
            {product?.reviews && product?.reviews[0] ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    height: 400,
                    alignItems: "center",
                    justifyContent: "center",
                    overflowY: { xs: "auto", sm: "hidden" },
                    overflowX: { xs: "hidden", sm: "auto" },
                    flexWrap: { xs: "wrap", sm: "nowrap" },
                  }}
                  component="div"
                >
                  {product?.reviews &&
                    product.reviews.map((review) => (
                      <React.Fragment key={review._id}>
                        <ReviewCard key={review._id} review={review} />
                      </React.Fragment>
                    ))}
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 4,
                }}
              >
                <Typography gutterBottom variant="h6">
                  No Reviews Yet
                </Typography>
              </Box>
            )}
          </>
        )}
      </Box>
    </React.Fragment>
  );
}

const CustomImage = styled("img")(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },
}));

const CustomImageBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "60%",
  },
}));

export default ProductDetails;
