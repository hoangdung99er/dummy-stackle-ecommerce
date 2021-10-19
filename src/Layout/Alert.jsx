import React from "react";
import { Alert as MuiAlert, Snackbar, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors } from "../store/actions/productAction";
import { clearErrors as clearUserErrors } from "../store/actions/userActions";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.products);
  const { error: profileError } = useSelector((state) => state.profile);
  const {
    error: userError,
    errorSignUp,
    errorLoadUser,
  } = useSelector((state) => state.user);
  const { error: reviewError } = useSelector((state) => state.newReview);
  const { message, error: resetPasswordError } = useSelector(
    (state) => state.forgotPassword
  );

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
      reviewError
    ) {
      setCustom({ ...custom, open: true });
    } else {
      setCustom({ ...custom, open: false });
      dispatch(clearErrors());
      dispatch(clearUserErrors());
    }
  }, [
    error,
    dispatch,
    userError,
    profileError,
    resetPasswordError,
    message || reviewError,
  ]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCustom({ ...custom, open: false });
    dispatch(clearErrors());
    dispatch(clearUserErrors());
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        open={open}
        autoHideDuration={6000}
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
            reviewError}
        </Alert>
      </Snackbar>
    </>
  );
}
