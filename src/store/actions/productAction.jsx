import axios from "axios";
import * as types from "../constants/productConstant";
import { FetchAPI } from "../../store/lib/callApi";

export const getAllProduct = () => async (dispatch) => {
  dispatch({ type: types.ALL_PRODUCT_REQUEST });

  const { responseData, error } = await FetchAPI("/products");
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

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_ERRORS });
};
