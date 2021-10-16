import React from "react";
import {
  VisibilityOff,
  Visibility,
  Lock,
  Email,
  Pageview,
  Cancel,
  Person,
} from "@mui/icons-material";

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Box,
  Input,
  Avatar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { onRegisterAction } from "../store/actions/userActions";
import Alert from "../Layout/Alert";
import LoadingButton from "../Layout/LoadingButton";

function Register() {
  const [values, setValues] = React.useState({
    email: "",
    name: "",
    password: "",
    cfmPassword: "",
    showPassword: false,
    showCfPassword: false,
  });

  const { loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const { email, name, password } = values;

  const [file, setFile] = React.useState(null);

  const handleChangeValues = (prop) => (event) => {
    if (prop === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setFile(reader.result);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      setValues({ ...values, [prop]: event.target.value });
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
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

  const registerHandleSubmit = (e) => {
    e.preventDefault();

    if (!file) return;

    const userData = {
      name,
      email,
      password,
      file,
    };

    dispatch(onRegisterAction(userData));
  };

  return (
    <React.Fragment>
      <Alert />
      <form onSubmit={registerHandleSubmit}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
          <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            }
            id="outlined-adornment-name"
            type="text"
            value={values.name}
            onChange={handleChangeValues("name")}
            label="Name"
          />
        </FormControl>
        <FormControl sx={{ mt: 4 }} fullWidth variant="outlined">
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
        <FormControl sx={{ mt: 4 }} fullWidth variant="outlined">
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
            value={values.cfmPassword}
            onChange={handleChangeValues("cfmPassword")}
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
        <Box sx={{ display: "flex", mt: 2, alignItems: "center" }}>
          <label htmlFor="icon-button-file">
            Avatar Picture
            <Input
              sx={{ display: "none" }}
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={handleChangeValues("avatar")}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <Pageview />
            </IconButton>
          </label>
          {file && (
            <Avatar
              alt="profile"
              src={file}
              sx={{ width: 56, height: 56, ml: 2, mr: 1 }}
            />
          )}
          {file && (
            <IconButton onClick={() => setFile(null)} size="small">
              <Cancel />
            </IconButton>
          )}
        </Box>

        <Button
          sx={{ mt: 2 }}
          size="large"
          variant="contained"
          fullWidth
          type="submit"
          color="primary"
          disabled={loading ? true : false}
          sx={{ "&:disabled": { cursor: "not-allowed" } }}
        >
          {loading ? <LoadingButton /> : "SIGN UP"}
        </Button>
      </form>
    </React.Fragment>
  );
}

export default Register;
