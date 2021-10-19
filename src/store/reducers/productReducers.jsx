import * as types from "../constants/productConstant";

const initialState = {
  products: [],
};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ALL_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        products: [],
      };
    case types.ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload?.products,
        productsCount: payload?.productCount,
      };
    case types.ALL_PRODUCT_FAILURE:
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

const initialStateProducts = {
  product: {},
};

export const productDetailsReducer = (
  state = initialStateProducts,
  { type, payload }
) => {
  switch (type) {
    case types.PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: payload,
      };
    case types.PRODUCT_DETAILS_FAILURE:
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

export const newReviewReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.NEW_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload,
        message: "Review Submitted Successfully!",
      };
    case types.NEW_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
        message: null,
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
