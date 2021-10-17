import React, { useEffect } from "react";
import { Email } from "@mui/icons-material";
import { onResetPassword } from "../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../Layout/Alert";
import LoadingButton from "../Layout/LoadingButton";
import { styled } from "@mui/material/styles";
import MetaData from "../Meta/MetaData";

import {
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Button,
  Box,
} from "@mui/material";

function UpdateProfile() {
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [values, setValues] = React.useState({
    email: "",
  });

  const { email } = values;

  const handleChangeValues = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const updateProfileHandleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
    };

    dispatch(onResetPassword(userData));
  };

  return (
    <React.Fragment>
      <Alert />

      <MetaData title="RESET PASSWORD" />
      <Box sx={{ height: "74vh", p: 6 }}>
        <CustomForm onSubmit={updateProfileHandleSubmit}>
          <Typography variant="h4" sx={{ color: "#a79f9f", mb: 3 }}>
            RESET PASSWORD
          </Typography>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">E-mail</InputLabel>
            <OutlinedInput
              startAdornment={
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              }
              id="outlined-adornment-email"
              type="email"
              value={values.email}
              onChange={handleChangeValues("email")}
              label="E-mail"
            />
          </FormControl>

          <Button
            type="submit"
            size="large"
            variant="contained"
            fullWidth
            color="primary"
            disabled={loading ? true : false}
            sx={{ "&:disabled": { cursor: "not-allowed" }, mt: 3 }}
          >
            {loading ? <LoadingButton /> : "SEND"}
          </Button>
        </CustomForm>
      </Box>
    </React.Fragment>
  );
}

const CustomForm = styled("form")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    width: "50%",
  },
  [theme.breakpoints.up("xs")]: {
    widh: "80%",
  },
  height: "85%",
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
}));

export default UpdateProfile;
