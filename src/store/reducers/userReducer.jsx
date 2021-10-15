import * as types from "../constants/userConstant";

const initialState = {
  user: {},
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.LOGIN_USER_REQUEST:
    case types.REGISTER_USER_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
      };
    case types.LOGIN_USER_SUCCESS:
    case types.REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload?.user,
        isAuthenticated: !!payload?.token,
      };
    case types.LOGIN_USER_FAILURE:
    case types.REGISTER_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        user: null,
        isAuthenticated: false,
      };
    case types.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
