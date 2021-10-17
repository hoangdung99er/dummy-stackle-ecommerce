import React, { useEffect } from "react";
import { VisibilityOff, Visibility, Lock, VpnKey } from "@mui/icons-material";
import { onForgotPassword } from "../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../Layout/Alert";
import LoadingButton from "../Layout/LoadingButton";
import { styled } from "@mui/material/styles";
import { useHistory, useParams } from "react-router-dom";
import MetaData from "../Meta/MetaData";

import {
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Box,
} from "@mui/material";

function ResetPassword() {
  const history = useHistory();
  const { token } = useParams();
  const dispatch = useDispatch();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [values, setValues] = React.useState({
    newPassword: "",
    confirmPassword: "",
    showNewPassword: false,
    showCfPassword: false,
  });

  const { newPassword, confirmPassword } = values;

  const handleChangeValues = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const updateProfileHandleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      password: newPassword,
      confirmPassword,
    };

    dispatch(onForgotPassword(token, userData));
  };

  const handleClickShowNewPassword = () => {
    setValues({
      ...values,
      showNewPassword: !values.showNewPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showCfPassword: !values.showCfPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (success) {
      history.push("/login");
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <Alert />
      <MetaData title={`CHANGE PASSWORD`} />
      <Box sx={{ height: "74vh", p: 6 }}>
        <CustomForm onSubmit={updateProfileHandleSubmit}>
          <Typography variant="h4" sx={{ color: "#a79f9f", mb: 2 }}>
            Change Password
          </Typography>
          <FormControl sx={{ mt: 4 }} fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-new-password">
              New Password
            </InputLabel>
            <OutlinedInput
              startAdornment={
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              }
              id="outlined-adornment-new-password"
              type={values.showNewPassword ? "text" : "password"}
              value={values.newPassword}
              onChange={handleChangeValues("newPassword")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle new password visibility"
                    onClick={handleClickShowNewPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showNewPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
          </FormControl>
          <FormControl sx={{ mt: 4, mb: 4 }} fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-cfpassword">
              Comfirm Password
            </InputLabel>
            <OutlinedInput
              startAdornment={
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              }
              id="outlined-adornment-cfpassword"
              type={values.showCfPassword ? "text" : "password"}
              value={values.confirmPassword}
              onChange={handleChangeValues("confirmPassword")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showCfPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
          </FormControl>
          <Button
            type="submit"
            size="large"
            variant="contained"
            fullWidth
            color="primary"
            disabled={loading ? true : false}
            sx={{ "&:disabled": { cursor: "not-allowed" } }}
          >
            {loading ? <LoadingButton /> : "RESET"}
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

export default ResetPassword;
