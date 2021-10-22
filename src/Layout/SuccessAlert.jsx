import React from "react";
import { Alert as MuiAlert, Snackbar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { clearMessage } from "../store/actions/cartAction";
import { clearErrors } from "../store/actions/productAction";
import { clearErrors as clearUserErrors } from "../store/actions/userActions";
import { clearErrors as clearOrderErrors } from "../store/actions/orderActions";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.cart);
  const { message: reviewMessage } = useSelector((state) => state.newReview);
  const { message: newProductMessage } = useSelector(
    (state) => state.newProduct
  );
  const { message: handleMessage } = useSelector(
    (state) => state.handleProduct
  );
  const { message: handleOrderMessage } = useSelector(
    (state) => state.handleOrder
  );
  const { message: handleUserMessage } = useSelector(
    (state) => state.handleUsers
  );
  const { message: handleReviewMessage } = useSelector(
    (state) => state.handleReviews
  );

  const [custom, setCustom] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });

  const { open, vertical, horizontal } = custom;
  React.useEffect(() => {
    if (
      message ||
      reviewMessage ||
      newProductMessage ||
      handleMessage ||
      handleOrderMessage ||
      handleUserMessage ||
      handleReviewMessage
    ) {
      setCustom({ ...custom, open: true });
    } else {
      setCustom({ ...custom, open: false });
      dispatch(clearMessage());
      dispatch(clearErrors());
      dispatch(clearOrderErrors());
      dispatch(clearUserErrors());
    }
  }, [
    message,
    reviewMessage,
    handleMessage,
    newProductMessage,
    handleOrderMessage,
    handleUserMessage,
    handleReviewMessage,
  ]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCustom({ ...custom, open: false });
    dispatch(clearMessage());
    dispatch(clearOrderErrors());
    dispatch(clearErrors());
    dispatch(clearUserErrors());
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {message ||
            reviewMessage ||
            newProductMessage ||
            handleMessage ||
            handleOrderMessage ||
            handleUserMessage ||
            handleReviewMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
