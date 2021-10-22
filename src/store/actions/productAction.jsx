import * as types from "../constants/productConstant";
import { FetchAPI } from "../../store/lib/callApi";

export const getAllProduct =
  (keyword = "", page = 1, price = [0, 25000], category, rating = 0) =>
  async (dispatch) => {
    dispatch({ type: types.ALL_PRODUCT_REQUEST });

    let endpoint = `/products?keyword=${keyword}&page=${
      page > 1 && keyword ? 1 : page
    }&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;

    if (category) {
      endpoint = `/products?keyword=${keyword}&page=${
        page > 1 && keyword ? 1 : page
      }&price[gte]=${price[0]}&price[lte]=${
        price[1]
      }&category=${category}&ratings[gte]=${rating}`;
    }

    const { responseData, error } = await FetchAPI(endpoint);

    if (!error) {
      dispatch({
        type: types.ALL_PRODUCT_SUCCESS,
        payload: responseData,
      });
    } else {
      dispatch({
        type: types.ALL_PRODUCT_FAILURE,
        payload: error,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  dispatch({ type: types.PRODUCT_DETAILS_REQUEST });

  const { responseData, error } = await FetchAPI(`/product/${id}`);
  if (!error) {
    dispatch({
      type: types.PRODUCT_DETAILS_SUCCESS,
      payload: responseData?.product,
    });
  } else {
    dispatch({
      type: types.PRODUCT_DETAILS_FAILURE,
      payload: error,
    });
  }
};

export const createNewReview = (reviewData) => async (dispatch) => {
  dispatch({ type: types.NEW_REVIEW_REQUEST });

  const config = {
    "Content-Type": "application/json",
  };

  const { responseData, error } = await FetchAPI(
    `/review`,
    "PUT",
    reviewData,
    config
  );
  if (!error) {
    dispatch({
      type: types.NEW_REVIEW_SUCCESS,
      payload: responseData?.success,
    });
  } else {
    dispatch({
      type: types.NEW_REVIEW_FAILURE,
      payload: error,
    });
  }
};

export const getAdminProducts = () => async (dispatch) => {
  dispatch({ type: types.ADMIN_PRODCTS_REQUEST });

  const { responseData, error } = await FetchAPI(`/admin/products`);

  if (!error) {
    dispatch({
      type: types.ADMIN_PRODCTS_SUCCESS,
      payload: responseData?.products,
    });
  } else {
    dispatch({
      type: types.ADMIN_PRODCTS_FAILURE,
      payload: error,
    });
  }
};

export const getAllReviews = (id) => async (dispatch) => {
  dispatch({ type: types.ALL_REVIEW_REQUEST });

  const { responseData, error } = await FetchAPI(`/reviews?productId=${id}`);

  if (!error) {
    dispatch({
      type: types.ALL_REVIEW_SUCCESS,
      payload: responseData,
    });
  } else {
    dispatch({
      type: types.ALL_REVIEW_FAILURE,
      payload: error,
    });
  }
};

export const deleteReview = (reviewId, productId) => async (dispatch) => {
  dispatch({ type: types.DELETE_REVIEW_REQUEST });

  const { responseData, error } = await FetchAPI(
    `/reviews?productId=${productId}&id=${reviewId}`,
    "DELETE",
    null,
    {}
  );

  if (!error) {
    dispatch({
      type: types.DELETE_REVIEW_SUCCESS,
      payload: responseData,
    });
  } else {
    dispatch({
      type: types.DELETE_REVIEW_FAILURE,
      payload: error,
    });
  }
};

export const createProduct = (productDetails) => async (dispatch) => {
  dispatch({ type: types.NEW_PRODUCT_REQUEST });

  const config = {
    "Content-Type": "application/json",
  };

  const { responseData, error } = await FetchAPI(
    `/admin/product/new`,
    "POST",
    productDetails,
    config
  );

  if (!error) {
    dispatch({
      type: types.NEW_PRODUCT_SUCCESS,
      payload: responseData,
    });
  } else {
    dispatch({
      type: types.NEW_REVIEW_FAILURE,
      payload: error,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_PRODUCT_REQUEST });

  const { responseData, error } = await FetchAPI(
    `/admin/product/${id}`,
    "DELETE",
    null,
    {}
  );

  if (!error) {
    dispatch({
      type: types.DELETE_PRODUCT_SUCCESS,
      payload: responseData,
    });
  } else {
    dispatch({
      type: types.DELETE_PRODUCT_FAILURE,
      payload: error,
    });
  }
};

export const updateProduct = (id, productDetails) => async (dispatch) => {
  dispatch({ type: types.UPDATE_PRODUCT_REQUEST });

  const config = {
    "Content-Type": "application/json",
  };

  const { responseData, error } = await FetchAPI(
    `/admin/product/${id}`,
    "PUT",
    productDetails,
    config
  );

  if (!error) {
    dispatch({
      type: types.UPDATE_PRODUCT_SUCCESS,
      payload: responseData,
    });
  } else {
    dispatch({
      type: types.UPDATE_PRODUCT_FAILURE,
      payload: error,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_ERRORS });
};
