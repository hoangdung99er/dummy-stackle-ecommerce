import * as types from "../constants/cartConstant";
import { FetchAPI } from "../../store/lib/callApi";

export const addItemsToCart = (id, quantity, cartItems) => {
  return async (dispatch, getState) => {
    dispatch({
      type: types.ADD_TO_CART_SUCCESS,
    });

    const { responseData, error } = await FetchAPI(`/product/${id}`);

    if (!error) {
      dispatch({
        type: types.ADD_TO_CART,
        payload: {
          product: responseData.product._id,
          name: responseData.product.name,
          price: responseData.product.price,
          image: responseData.product.images[0].url,
          stock: responseData.product.stock,
          quantity,
        },
      });

      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
    }
  };
};

export const removeCartItem = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: types.REMOVE_CART_ITEM,
      payload: {
        id,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const saveShippingInfo = (data) => {
  return async (dispatch, getState) => {
    dispatch({
      type: types.SAVE_SHIPPING_INFO,
      payload: data,
    });

    localStorage.setItem(
      "shippingInfo",
      JSON.stringify(getState().cart.shippingInfo)
    );
  };
};

export const clearMessage = () => {
  return async (dispatch) => {
    dispatch({ type: types.CLEAR_MESSAGE });
  };
};
