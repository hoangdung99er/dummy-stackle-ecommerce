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
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: payload?.success,
      };
    case types.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.UPDATE_PROFILE_RESET:
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
