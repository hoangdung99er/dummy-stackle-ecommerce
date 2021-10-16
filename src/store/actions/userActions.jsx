import * as types from "../constants/userConstant";
import { FetchAPI } from "../../store/lib/callApi";

//  Login
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

// Register
export const onRegisterAction = (userData) => {
  return async (dispatch) => {
    dispatch({ type: types.REGISTER_USER_REQUEST });

    const { responseData, error } = await FetchAPI(
      `/register`,
      "POST",
      userData,
      {
        "Content-Type": "application/json",
      }
    );

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

// Load User
export const onLoadUserAction = () => {
  return async (dispatch) => {
    dispatch({ type: types.LOAD_USER_REQUEST });

    const { responseData, error } = await FetchAPI(`/me`);

    if (!error) {
      dispatch({
        type: types.LOAD_USER_SUCCESS,
        payload: responseData,
      });
    } else {
      dispatch({
        type: types.LOAD_USER_FAILURE,
        payload: error,
      });
    }
  };
};

// Logout User
export const onLogoutAction = () => {
  return async (dispatch) => {
    await FetchAPI(`/logout`);

    dispatch({
      type: types.LOGOUT_USER,
    });
  };
};

// Update Profile
export const onUpdateUserAction = (userData) => {
  return async (dispatch) => {
    dispatch({ type: types.UPDATE_PROFILE_REQUEST });

    const { responseData, error } = await FetchAPI(
      `/update/me`,
      "PUT",
      userData,
      {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    );

    if (!error) {
      dispatch({
        type: types.UPDATE_PROFILE_SUCCESS,
        payload: responseData,
      });
    } else {
      dispatch({
        type: types.UPDATE_PROFILE_FAILURE,
        payload: error,
      });
    }
  };
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_ERRORS });
};
