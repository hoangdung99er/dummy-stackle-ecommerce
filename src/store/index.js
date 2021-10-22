import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducer,
  productDetailsReducer,
  newReviewReducer,
  createProductReducer,
  handleProductReducer,
  handleReviewsReducer,
  reviewsReducer,
} from "./reducers/productReducers";
import {
  userReducer,
  profileReducer,
  forgotPasswordReducer,
  allUsersReducer,
  handleUserReducer,
  userDetailsReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  newOrderReducer,
  myOrderReducer,
  orderDetailsReducer,
  allOrdersReducer,
  handleOrdersReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrderReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: createProductReducer,
  handleProduct: handleProductReducer,
  allOrders: allOrdersReducer,
  handleOrder: handleOrdersReducer,
  allUsers: allUsersReducer,
  handleUsers: handleUserReducer,
  userDetails: userDetailsReducer,
  handleReviews: handleReviewsReducer,
  allReviews: reviewsReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

export default createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
