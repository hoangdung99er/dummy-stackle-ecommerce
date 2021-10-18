import React from "react";
import MetaData from "../Meta/MetaData";
import { Country, State } from "country-state-city";
import { PinDrop, Home, LocationCity, Phone } from "@mui/icons-material";
import * as types from "../store/constants/cartConstant";
import FailureAlert from "../Layout/FailureAlert";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { saveShippingInfo } from "../store/actions/cartAction";
import { useHistory } from "react-router-dom";
import {
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Button,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import Stepper from "../Layout/Stepper";

function Shipping() {
  const { shippingInfo } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const history = useHistory();
  const [userInfo, setUserInfo] = React.useState({
    address: shippingInfo?.address || "",
    city: shippingInfo?.city || "",
    state: shippingInfo?.state || "",
    pinCode: shippingInfo?.pinCode || "",
    phoneNo: shippingInfo?.phoneNo || "",
    country: shippingInfo?.country || "",
  });

  const handleChangeValues = (prop) => (event) => {
    setUserInfo({ ...userInfo, [prop]: event.target.value });
  };

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (userInfo.phoneNo.length < 10 || userInfo.phoneNo.length > 10) {
      dispatch({
        type: types.SUBMIT_SHIPPING_INFO_FAILURE,
        payload: "Invalid phone number",
      });
      return;
    }

    dispatch(saveShippingInfo(userInfo));
    history.push("/order/confirm");
  };

  return (
    <React.Fragment>
      <FailureAlert />
      <MetaData title="SHIPPING INFO" />
      <Box
        component="div"
        sx={{
          maxWidth: { xs: "100%", sm: "80%", md: "60%", lg: "50%" },
          margin: "0 auto",
          display: "flex",
          minHeight: "85vh",
        }}
      >
        <Box sx={{ width: "100%", mt: 10 }}>
          <Stepper activeStep={0} />
          <CustomForm onSubmit={shippingSubmit}>
            <Typography
              align="center"
              variant="h4"
              sx={{ color: "#a79f9f", mt: 3 }}
            >
              SHIPPING DETAILS
            </Typography>
            <FormControl sx={{ mt: 4 }} fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-address">
                Address
              </InputLabel>
              <OutlinedInput
                startAdornment={
                  <InputAdornment position="start">
                    <Home />
                  </InputAdornment>
                }
                id="outlined-adornment-address"
                type="text"
                value={userInfo.address}
                onChange={handleChangeValues("address")}
                label="Address"
              />
            </FormControl>
            <FormControl sx={{ mt: 4 }} fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-city">City</InputLabel>
              <OutlinedInput
                startAdornment={
                  <InputAdornment position="start">
                    <LocationCity />
                  </InputAdornment>
                }
                id="outlined-adornment-city"
                type="text"
                value={userInfo.city}
                onChange={handleChangeValues("city")}
                label="City"
              />
            </FormControl>
            <FormControl sx={{ mt: 4 }} fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-pinCode">
                Pin Code
              </InputLabel>
              <OutlinedInput
                startAdornment={
                  <InputAdornment position="start">
                    <PinDrop />
                  </InputAdornment>
                }
                id="outlined-adornment-pinCode"
                type="number"
                value={userInfo.pinCode}
                onChange={handleChangeValues("pinCode")}
                label="Pin Code"
              />
            </FormControl>
            <FormControl sx={{ mt: 4 }} fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-phoneNo">
                Phone No.
              </InputLabel>
              <OutlinedInput
                startAdornment={
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                }
                id="outlined-adornment-phoneNo"
                type="number"
                value={userInfo.phoneNo}
                onChange={handleChangeValues("phoneNo")}
                label="Phone No."
              />
            </FormControl>
            <FormControl sx={{ mt: 4 }} fullWidth variant="outlined">
              <InputLabel htmlFor="country-select-label">Country</InputLabel>
              <Select
                labelId="country-select-label"
                id="country-select"
                value={userInfo.country}
                label="Country"
                onChange={handleChangeValues("country")}
              >
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <MenuItem key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            {userInfo.country && (
              <FormControl sx={{ mt: 4 }} fullWidth variant="outlined">
                <InputLabel htmlFor="state-select-label">State</InputLabel>
                <Select
                  labelId="state-select-label"
                  id="state-select"
                  value={userInfo.state}
                  label="State"
                  onChange={handleChangeValues("state")}
                >
                  {State &&
                    State.getStatesOfCountry(userInfo.country).map((item) => (
                      <MenuItem key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
            <Button
              type="submit"
              size="large"
              variant="contained"
              fullWidth
              color="primary"
              sx={{ mt: 4 }}
              disabled={userInfo.state ? false : true}
            >
              Continue
            </Button>
          </CustomForm>
        </Box>
      </Box>
    </React.Fragment>
  );
}

const CustomForm = styled("form")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    width: "50%",
  },
  [theme.breakpoints.up("xs")]: {
    width: "80%",
  },
  minHeight: "85%",
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
}));

export default Shipping;
