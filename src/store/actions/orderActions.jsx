import * as types from "../constants/orderConstant";
import { FetchAPI } from "../../store/lib/callApi";

export const createOrder = (order) => {
  return async (dispatch) => {
    dispatch({ type: types.CREATE_ORDER_REQUEST });

    const config = {
      "Content-Type": "application/json",
    };

    const { responseData, error } = await FetchAPI(
      "/order/new",
      "POST",
      order,
      config
    );

    if (!error) {
      dispatch({
        type: types.CREATE_ORDER_SUCCESS,
        payload: responseData?.order,
      });
    } else {
      dispatch({
        type: types.CREATE_ORDER_FAIL,
        payload: error,
      });
    }
  };
};

export const myOrders = () => {
  return async (dispatch) => {
    dispatch({ type: types.MY_ORDERS_REQUEST });

    const { responseData, error } = await FetchAPI("/orders/me");

    if (!error) {
      dispatch({
        type: types.MY_ORDERS_SUCCESS,
        payload: responseData?.orders,
      });
    } else {
      dispatch({
        type: types.MY_ORDERS_FAIL,
        payload: error,
      });
    }
  };
};

export const onOrderDetails = (orderId) => {
  return async (dispatch) => {
    dispatch({ type: types.ORDER_DETAILS_REQUEST });

    const { responseData, error } = await FetchAPI(`/order/${orderId}`);

    if (!error) {
      dispatch({
        type: types.ORDER_DETAILS_SUCCESS,
        payload: responseData?.order,
      });
    } else {
      dispatch({
        type: types.ORDER_DETAILS_FAIL,
        payload: error,
      });
    }
  };
};

export const getAllOrders = () => {
  return async (dispatch) => {
    dispatch({ type: types.ALL_ORDERS_REQUEST });

    const { responseData, error } = await FetchAPI(`/admin/orders`);

    if (!error) {
      dispatch({
        type: types.ALL_ORDERS_SUCCESS,
        payload: responseData?.orders,
      });
    } else {
      dispatch({
        type: types.ALL_ORDERS_FAIL,
        payload: error,
      });
    }
  };
};

export const updateOrder = (id, status) => {
  return async (dispatch) => {
    dispatch({ type: types.UPDATE_ORDERS_REQUEST });

    const config = {
      "Content-Type": "application/json",
    };

    const { responseData, error } = await FetchAPI(
      `/admin/order/${id}`,
      "PUT",
      { status },
      config
    );

    if (!error) {
      dispatch({
        type: types.UPDATE_ORDERS_SUCCESS,
        payload: responseData,
      });
    } else {
      dispatch({
        type: types.UPDATE_ORDERS_FAIL,
        payload: error,
      });
    }
  };
};

export const deleteOrder = (id) => {
  return async (dispatch) => {
    dispatch({ type: types.DELETE_ORDERS_REQUEST });

    const { responseData, error } = await FetchAPI(
      `/admin/order/${id}`,
      "DELETE",
      null,
      {}
    );

    if (!error) {
      dispatch({
        type: types.DELETE_ORDERS_SUCCESS,
        payload: responseData,
      });
    } else {
      dispatch({
        type: types.DELETE_ORDERS_FAIL,
        payload: error,
      });
    }
  };
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_ERRORS });
};
