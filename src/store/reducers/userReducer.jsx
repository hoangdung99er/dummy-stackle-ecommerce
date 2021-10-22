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

export const allUsersReducer = (state = { users: [] }, { type, payload }) => {
  switch (type) {
    case types.ALL_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ALL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: payload?.users,
      };
    case types.ALL_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
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

export const userDetailsReducer = (state = { user: {} }, { type, payload }) => {
  switch (type) {
    case types.USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload?.user,
      };
    case types.USER_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case types.CLEAR_USER_DETAILS_AFTER_UPDATE:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};

export const handleUserReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.UPDATE_USER_REQUEST:
    case types.DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: payload?.success,
        message: "User was updated",
      };
    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: payload?.success,
        message: "User updated successfully",
      };
    case types.UPDATE_USER_FAILURE:
    case types.DELETE_USER_FAILURE:
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
    case types.CLEAR_ISDELETED:
      return {
        ...state,
        isDeleted: false,
        message: "User was deleted",
      };
    case types.CLEAR_ISUPDATED:
      return {
        ...state,
        isUpdated: false,
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
