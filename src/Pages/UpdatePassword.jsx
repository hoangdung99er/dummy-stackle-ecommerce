import React, { useEffect } from "react";
import { VisibilityOff, Visibility, Lock, VpnKey } from "@mui/icons-material";
import {
  onUpdatePassword,
  onLoadUserAction,
} from "../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../Layout/Alert";
import LoadingButton from "../Layout/LoadingButton";
import { UPDATE_PASSWORD_RESET } from "../store/constants/userConstant";
import { styled } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
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

function UpdatePassword() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [values, setValues] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    showOldPassword: false,
    showNewPassword: false,
    showCfPassword: false,
  });

  const { oldPassword, newPassword, confirmPassword } = values;

  const handleChangeValues = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const updateProfileHandleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    dispatch(onUpdatePassword(userData));
  };

  const handleClickShowOldPassword = () => {
    setValues({
      ...values,
      showOldPassword: !values.showOldPassword,
    });
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
    if (isUpdated) {
      dispatch(onLoadUserAction());
      history.push("/account");

      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, isUpdated]);

  return (
    <React.Fragment>
      <Alert />
      <MetaData title={`UPDATE PASSWORD`} />
      <Box sx={{ height: "74vh", p: 6 }}>
        <CustomForm onSubmit={updateProfileHandleSubmit}>
          <Typography variant="h4" sx={{ color: "#a79f9f", mb: 2 }}>
            Update Password
          </Typography>
          <FormControl sx={{ mt: 4 }} fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-old-password">
              Old Password
            </InputLabel>
            <OutlinedInput
              startAdornment={
                <InputAdornment position="start">
                  <VpnKey />
                </InputAdornment>
              }
              id="outlined-adornment-old-password"
              type={values.showOldPassword ? "text" : "password"}
              value={values.oldPassword}
              onChange={handleChangeValues("oldPassword")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowOldPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showOldPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Old Password"
            />
          </FormControl>
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
            {loading ? <LoadingButton /> : "Update"}
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

export default UpdatePassword;
