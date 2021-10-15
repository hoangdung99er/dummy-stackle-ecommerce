import React from "react";
import {
  VisibilityOff,
  Visibility,
  Lock,
  Email,
  GitHub,
  Google,
  Facebook,
} from "@mui/icons-material";
import { onLoginAction } from "../store/actions/userActions";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../Layout/Alert";
import LoadingButton from "../Layout/LoadingButton";

import {
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Stack,
  Box,
} from "@mui/material";

function Login() {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const { email, password } = values;

  const { loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleChangeValues = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    dispatch(onLoginAction(email, password));
  };

  return (
    <React.Fragment>
      <Alert />
      <form onSubmit={handleSubmitLogin}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-email">E-mail</InputLabel>
          <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            }
            id="outlined-adornment-email"
            type="text"
            value={values.email}
            onChange={handleChangeValues("email")}
            label="-Email"
          />
        </FormControl>
        <FormControl sx={{ mt: 4 }} fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            }
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChangeValues("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Link to="/password/forgot">
          <Typography
            variant="body2"
            align="right"
            sx={{
              textDecoration: "underline",
              color: "black",
              "&:hover": { opacity: 0.8 },
              cursor: "pointer",
              margin: "2rem 0",
              maxWidth: "fit-content",
            }}
          >
            Forgot Password
          </Typography>
        </Link>

        <Button
          type="submit"
          size="large"
          variant="contained"
          fullWidth
          color="primary"
          disabled={loading ? true : false}
          sx={{ "&:disabled": { cursor: "not-allowed" } }}
        >
          {loading ? <LoadingButton /> : "LOGIN"}
        </Button>
        <Stack
          justifyContent="center"
          alignItems="center"
          direction="row"
          spacing={6}
          sx={{ mt: 4 }}
        >
          <IconButton size="large">
            <GitHub sx={{ color: "#333" }} />
          </IconButton>
          <IconButton size="large">
            <Google sx={{ color: "#87a75a" }} />
          </IconButton>
          <IconButton size="large">
            <Facebook sx={{ color: "#375088" }} />
          </IconButton>
        </Stack>
      </form>
    </React.Fragment>
  );
}

export default Login;
