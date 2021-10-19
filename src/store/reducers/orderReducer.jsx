import * as types from "../constants/orderConstant";

const initialState = {
  order: {},
};

export const newOrderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        order: payload,
        loading: false,
      };
    case types.CREATE_ORDER_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
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

export const myOrderReducer = (state = { orders: [] }, { type, payload }) => {
  switch (type) {
    case types.MY_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.MY_ORDERS_SUCCESS:
      return {
        ...state,
        orders: payload,
        loading: false,
      };
    case types.MY_ORDERS_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
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

export const orderDetailsReducer = (
  state = { order: {} },
  { type, payload }
) => {
  switch (type) {
    case types.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        order: payload,
        loading: false,
      };
    case types.ORDER_DETAILS_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
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
