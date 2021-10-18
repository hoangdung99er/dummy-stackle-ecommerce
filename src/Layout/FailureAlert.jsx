import React from "react";
import { Alert as MuiAlert, Snackbar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { clearMessage } from "../store/actions/cartAction";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ isPhoneValid }) {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.cart);

  const [custom, setCustom] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });

  const { open, vertical, horizontal } = custom;
  React.useEffect(() => {
    if (message) {
      setCustom({ ...custom, open: true });
    } else {
      setCustom({ ...custom, open: false });
      dispatch(clearMessage());
    }
  }, [message, isPhoneValid]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCustom({ ...custom, open: false });
    dispatch(clearMessage());
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
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
