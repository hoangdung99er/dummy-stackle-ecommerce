import * as types from "../constants/productConstant";

const initialState = {
  products: [],
};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ALL_PRODUCT_REQUEST:
    case types.ADMIN_PRODCTS_REQUEST:
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
    case types.ADMIN_PRODCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload,
      };
    case types.ALL_PRODUCT_FAILURE:
    case types.ADMIN_PRODCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

export const reviewsReducer = (state = { reviews: [] }, { type, payload }) => {
  switch (type) {
    case types.ALL_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ALL_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: payload?.reviews,
      };
    case types.ALL_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: "Need to input product ID.",
      };
    case types.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loading: false,
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
        loading: false,
      };
    case types.CREAT_PRODUCT_DETAILS_AFTER_UPDATE:
      return {
        ...state,
        product: {},
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
        loading: false,
      };
    default:
      return state;
  }
};

export const createProductReducer = (
  state = { products: {} },
  { type, payload }
) => {
  switch (type) {
    case types.NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.NEW_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload?.success,
        product: payload?.product,
        message: "Create Product Successfully!",
      };
    case types.NEW_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.NEW_PRODUCT_RESET:
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
        loading: false,
      };
    default:
      return state;
  }
};

export const handleReviewsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: payload?.success,
        message: "Review deleted successfully",
      };
    case types.DELETE_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loading: false,
        message: null,
      };
    case types.CLEAR_ISDELETED:
      return {
        ...state,
        isDeleted: false,
        message: "Review deleted successfully",
      };
    default:
      return state;
  }
};

export const handleProductReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.DELETE_PRODUCT_REQUEST:
    case types.UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: payload?.success,
        message: payload?.message,
      };
    case types.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: payload?.success,
        message: "Product was meanly updated meanly!",
      };
    case types.DELETE_PRODUCT_FAILURE:
    case types.UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.DELETE_PRODUCT_RESET:
    case types.UPDATE_PRODUCT_RESET:
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
        loading: false,
      };
    case types.CLEAR_ISDELETED:
      return {
        ...state,
        isDeleted: false,
      };
    case types.CLEAR_ISUPDATED:
      return {
        isUpdated: false,
        message: "Product was deleted",
      };
    default:
      return state;
  }
};
