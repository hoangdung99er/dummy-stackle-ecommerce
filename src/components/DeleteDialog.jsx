import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
} from "@mui/material";
import LoadingButton from "../Layout/LoadingButton";
import { useSelector } from "react-redux";

function DeleteDialog({ open, setOpen, handleClickDelete, data }) {
  const { loading } = useSelector((state) => state.handleProduct);
  const { loading: deleteOrderLoading } = useSelector(
    (state) => state.handleOrder
  );
  const { loading: deleteUserLoading } = useSelector(
    (state) => state.handleUsers
  );
  const { loading: deleteReviewLoading } = useSelector(
    (state) => state.handleReviews
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`Are you sure to delete this ${data}`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Check it again probably this is what product you want to delete. Are
          you sure?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClickDelete}>
          {loading ||
          deleteOrderLoading ||
          deleteUserLoading ||
          deleteReviewLoading ? (
            <LoadingButton />
          ) : (
            "CONFIRM"
          )}
        </Button>
        <Button color="error" onClick={handleClose} autoFocus>
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
