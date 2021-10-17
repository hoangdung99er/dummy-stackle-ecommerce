import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
  TextField,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Add, Remove } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { addItemsToCart } from "../store/actions/cartAction";

function CartItemCard({ item }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = React.useState(item.quantity);

  const increaseQuantity = (id) => {
    if (item?.stock <= quantity) {
      return;
    }
    setQuantity(quantity + 1);
    dispatch(addItemsToCart(id, quantity + 1));
  };

  const decreaseQuantity = (id) => {
    if (quantity <= 1) {
      return;
    }
    setQuantity((prev) => prev - 1);
    dispatch(addItemsToCart(id, quantity - 1));
  };
  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <CardContent
        sx={{
          width: { xs: "35%", sm: "40%", md: "50%", lg: "60%" },
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <CustomImage src={item.image} src={item.image} />
        <Box
          sx={{
            ml: { xs: 0, sm: 2 },
            mt: { xs: 1, sm: 0 },
            display: { xs: "flex", sm: "block" },
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <CustomLink to={`/product/${item.product}`}>{item.name}</CustomLink>
          <Typography
            sx={{ fontWeight: 600, ml: { xs: 2, sm: 0 }, mr: { xs: 2, sm: 0 } }}
          >{`Price $${item.price}`}</Typography>
          <CardActions>
            <Button variant="contained" color="error">
              Remove
            </Button>
          </CardActions>
        </Box>
      </CardContent>
      <CardContent
        sx={{
          width: "18%",
          flexGrow: 1,
        }}
      >
        <CardActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="add quantity"
            onClick={() => decreaseQuantity(item.product)}
          >
            <Remove />
          </IconButton>
          <TextField
            id="standard-number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            size="medium"
            sx={{ "& input": { textAlign: "center" } }}
            InputProps={{
              inputProps: {
                min: 1,
                max: item?.stock,
              },
              readOnly: true,
            }}
            value={quantity}
          />

          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="add quantity"
            onClick={() => increaseQuantity(item.product)}
          >
            <Add />
          </IconButton>
        </CardActions>
      </CardContent>
      <CardContent
        sx={{
          width: "22%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>{`$${item.price * item.quantity}`}</Typography>
      </CardContent>
    </Card>
  );
}

const CustomImage = styled("img")(({ theme }) => ({
  objectFit: "cover",
  [theme.breakpoints.up("xs")]: {
    width: "80px",
    height: "80px",
  },
  [theme.breakpoints.up("sm")]: {
    width: "120px",
    height: "120px",
  },
}));

const CustomLink = styled(Link)({
  whiteSpace: "nowrap",
});

export default CartItemCard;
