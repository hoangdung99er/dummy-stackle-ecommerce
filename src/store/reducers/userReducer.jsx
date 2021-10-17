import * as types from "../constants/userConstant";

const initialState = {
  user: {},
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.LOGIN_USER_REQUEST:
    case types.REGISTER_USER_REQUEST:
    case types.LOAD_USER_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
      };
    case types.LOGIN_USER_SUCCESS:
    case types.REGISTER_USER_SUCCESS:
    case types.LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload?.user,
        isAuthenticated: !!payload?.token || !!payload?.user,
      };
    case types.LOGIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        user: null,
        isAuthenticated: false,
      };
    case types.REGISTER_USER_FAILURE:
      return {
        ...state,
        loading: false,
        errorSignUp: payload,
        user: null,
        isAuthenticated: false,
      };

    case types.LOGOUT_USER:
      return {
        ...state,
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case types.LOAD_USER_FAILURE:
      return {
        ...state,
        loading: false,
        errorLoadUser: payload,
        user: null,
        isAuthenticated: false,
      };
    case types.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        errorSignUp: null,
        errorLoadUser: null,
      };
    default:
      return state;
  }
};

const initialStateProfile = {
  userProfile: {},
};

export const profileReducer = (
  state = initialStateProfile,
  { type, payload }
) => {
  switch (type) {
    case types.UPDATE_PROFILE_REQUEST:
    case types.UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_PROFILE_SUCCESS:
    case types.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: !!payload?.user,
      };
    case types.UPDATE_PROFILE_FAILURE:
    case types.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.UPDATE_PROFILE_RESET:
    case types.UPDATE_PASSWORD_RESET:
      return {
        ...state,
        isUpdated: false,
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

export const forgotPasswordReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.FORGOT_PASSWORD_REQUEST:
    case types.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload?.message,
      };
    case types.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload?.success,
      };
    case types.FORGOT_PASSWORD_FAILURE:
    case types.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case types.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        message: null,
      };
    default:
      return state;
  }
};
