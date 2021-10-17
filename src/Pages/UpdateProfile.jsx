import React, { useEffect } from "react";
import { Email, Face, Pageview, Cancel } from "@mui/icons-material";
import {
  onUpdateUserAction,
  onLoadUserAction,
} from "../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../Layout/Alert";
import LoadingButton from "../Layout/LoadingButton";
import { UPDATE_PROFILE_RESET } from "../store/constants/userConstant";
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
  Input,
  Box,
  Avatar,
} from "@mui/material";

function UpdateProfile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [file, setFile] = React.useState(null);
  const [previewImage, setPreviewImage] = React.useState(null);

  const [values, setValues] = React.useState({
    email: "",
    name: "",
  });

  const { email, name } = values;

  const handleChangeValues = (prop) => (event) => {
    if (prop === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setFile(reader.result);
          setPreviewImage(reader.result);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      setValues({ ...values, [prop]: event.target.value });
    }
  };

  const updateProfileHandleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      file,
    };

    dispatch(onUpdateUserAction(userData));
  };

  useEffect(() => {
    if (user) {
      setValues({ ...values, name: user?.name, email: user?.email });
      setPreviewImage(user?.avatar?.url);
    }

    if (isUpdated) {
      dispatch(onLoadUserAction());
      history.push("/account");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, user, isUpdated]);

  return (
    <React.Fragment>
      <MetaData title={`Update ${user?.name}'s Profile`} />
      <Box sx={{ height: "74vh", p: 6 }}>
        <CustomForm onSubmit={updateProfileHandleSubmit}>
          <Typography variant="h4" sx={{ color: "#a79f9f", mb: 3 }}>
            Update Profile
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
          <FormControl sx={{ mt: 4 }} fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
            <OutlinedInput
              startAdornment={
                <InputAdornment position="start">
                  <Face />
                </InputAdornment>
              }
              id="outlined-adornment-name"
              type="text"
              value={values.name}
              onChange={handleChangeValues("name")}
              label="Name"
            />
          </FormControl>
          <Box sx={{ display: "flex", mt: 3, mb: 3, alignItems: "center" }}>
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
            {previewImage && (
              <Avatar
                alt="profile"
                src={previewImage}
                sx={{ width: 56, height: 56, ml: 2, mr: 1 }}
              />
            )}
            {previewImage && (
              <IconButton onClick={() => setPreviewImage(null)} size="small">
                <Cancel />
              </IconButton>
            )}
          </Box>
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

export default UpdateProfile;
