import React from "react";
import { Alert as MuiAlert, Snackbar, Button } from "@mui/material";
import { useSelector } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const { error } = useSelector((state) => state.products);
  const [custom, setCustom] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });

  const { open, vertical, horizontal } = custom;
  React.useEffect(() => {
    if (error) {
      setCustom({ ...custom, open: true });
    } else {
      setCustom({ ...custom, open: false });
    }
  }, [error]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCustom({ ...custom, open: false });
  };

  const handleClick = () => {
    setCustom({ ...custom, open: true });
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
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
