import * as types from "../constants/userConstant";
import { FetchAPI } from "../../store/lib/callApi";

export const onLoginAction = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: types.LOGIN_USER_REQUEST });

    const { responseData, error } = await FetchAPI(
      `/login`,
      "POST",
      {
        email: email,
        password: password,
      },
      {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    );

    if (!error) {
      dispatch({
        type: types.LOGIN_USER_SUCCESS,
        payload: responseData,
      });
    } else {
      dispatch({
        type: types.LOGIN_USER_FAILURE,
        payload: error,
      });
    }
  };
};

export const onRegisterAction = (userData) => {
  return async (dispatch) => {
    dispatch({ type: types.REGISTER_USER_REQUEST });

    // const { responseData, error } = await FetchAPI(
    //   `/register`,
    //   "POST",
    //   userData,
    //   {
    //     "Content-Type": "multipart/form-data",
    //   }
    // );

    const url =
      "https://private-fuchsia-giraffatitan.glitch.me/api/v1" + "/register";

    const response = await fetch(url, {
      method: "POST",
      body: userData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    let error = "";
    const responseData = await response.json();

    if (!response.ok) {
      error = responseData.error;
    }

    if (!error) {
      dispatch({
        type: types.REGISTER_USER_SUCCESS,
        payload: responseData,
      });
    } else {
      dispatch({
        type: types.REGISTER_USER_FAILURE,
        payload: error,
      });
    }
  };
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_ERRORS });
};
