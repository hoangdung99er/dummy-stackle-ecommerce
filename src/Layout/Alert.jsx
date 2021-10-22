import React from "react";
import { Alert as MuiAlert, Snackbar, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors } from "../store/actions/productAction";
import { clearErrors as clearUserErrors } from "../store/actions/userActions";
import { clearErrors as clearOrderErrors } from "../store/actions/orderActions";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.products);
  const { error: profileError } = useSelector((state) => state.profile);
  const { error: handleError } = useSelector((state) => state.handleProduct);
  const {
    error: userError,
    errorSignUp,
    errorLoadUser,
  } = useSelector((state) => state.user);
  const { error: reviewError } = useSelector((state) => state.newReview);
  const { error: newProductError } = useSelector((state) => state.newProduct);
  const { message, error: resetPasswordError } = useSelector(
    (state) => state.forgotPassword
  );
  const { error: orderErrors } = useSelector((state) => state.allOrders);
  const { error: usersError } = useSelector((state) => state.allUsers);
  const { error: handleOrderError } = useSelector((state) => state.handleOrder);
  const { error: handleUserError } = useSelector((state) => state.handleUsers);
  const { error: handleReviewsError } = useSelector(
    (state) => state.handleReviews
  );
  const { error: allReviewsError } = useSelector((state) => state.allReviews);

  const [custom, setCustom] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });

  const { open, vertical, horizontal } = custom;
  React.useEffect(() => {
    if (
      error ||
      userError ||
      errorSignUp ||
      errorLoadUser ||
      profileError ||
      resetPasswordError ||
      message ||
      reviewError ||
      newProductError ||
      handleError ||
      orderErrors ||
      handleOrderError ||
      usersError ||
      handleUserError ||
      handleReviewsError ||
      allReviewsError
    ) {
      setCustom({ ...custom, open: true });
    } else {
      setCustom({ ...custom, open: false });
      dispatch(clearErrors());
      dispatch(clearUserErrors());
      dispatch(clearOrderErrors());
    }
  }, [
    error,
    dispatch,
    userError,
    profileError,
    resetPasswordError,
    message,
    reviewError,
    newProductError,
    handleError,
    orderErrors,
    handleOrderError,
    usersError,
    handleUserError,
    errorSignUp,
    handleReviewsError,
    allReviewsError,
  ]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCustom({ ...custom, open: false });
    dispatch(clearErrors());
    dispatch(clearUserErrors());
    dispatch(clearOrderErrors());
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
        <Alert
          onClose={handleClose}
          severity={message ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {error ||
            userError ||
            errorSignUp ||
            errorLoadUser ||
            profileError ||
            resetPasswordError ||
            message ||
            reviewError ||
            newProductError ||
            handleError ||
            orderErrors ||
            handleOrderError ||
            usersError ||
            handleUserError ||
            handleReviewsError ||
            allReviewsError}
        </Alert>
      </Snackbar>
    </>
  );
}
