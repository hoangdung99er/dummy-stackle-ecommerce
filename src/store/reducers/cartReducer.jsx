import * as types from "../constants/cartConstant";

const initialState = {
  cartItems: [],
  shippingInfo: {},
};

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_TO_CART:
      const item = payload;

      const existItem = state?.cartItems?.find(
        (i) => i.product === item.product
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === existItem.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case types.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        message: "Item added to card",
      };
    case types.CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case types.REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== payload.id
        ),
        message: "Item was removed out from cart",
      };
    case types.SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: payload,
      };
    case types.SUBMIT_SHIPPING_INFO_FAILURE:
      return {
        ...state,
        message: payload,
      };
    default:
      return state;
  }
};
