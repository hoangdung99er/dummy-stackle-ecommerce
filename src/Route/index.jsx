import { Switch, Route } from "react-router-dom";
import {
  Homepage,
  ProductDetails,
  Products,
  Authentication,
  Profile,
  UpdateProfile,
  UpdatePassword,
  ResetPassword,
  ForgotPassword,
  Cart,
  Shipping,
  ConfirmOrder,
  Payment,
  SuccessOrder,
  MyOrder,
  OrderDetails,
  Dashboard,
  ProductList,
  NewProduct,
  UpdateProduct,
  Orders,
  ProcessOrder,
  UsersList,
  UpdateUser,
  Reviews,
} from "../Pages";
import ProtectRoute from "./protectRoute";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export default ({ stripeKey }) => {
  return (
    <Switch>
      <Route path="/" exact component={Homepage} />
      <Route path="/product/:id" component={ProductDetails} />
      <Route path="/products" exact component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route path="/login" component={Authentication} />
      <ProtectRoute path="/account" component={Profile} />
      <ProtectRoute path="/me/update" component={UpdateProfile} />
      <ProtectRoute path="/password/update" component={UpdatePassword} />
      <Route path="/password/forgot" component={ForgotPassword} />
      <Route path="/password/reset/:token" component={ResetPassword} />
      <Route path="/cart" component={Cart} />
      <ProtectRoute path="/shipping" component={Shipping} />
      <ProtectRoute path="/order/confirm" exact component={ConfirmOrder} />
      <ProtectRoute path="/order/success" exact component={SuccessOrder} />
      <ProtectRoute path="/orders" component={MyOrder} />
      <ProtectRoute path="/order/:id" exact component={OrderDetails} />
      <ProtectRoute
        isAdmin={true}
        exact
        path="/admin/dashboard"
        component={Dashboard}
      />

      <ProtectRoute
        exact
        isAdmin={true}
        path="/admin/products"
        component={ProductList}
      />

      <ProtectRoute
        exact
        isAdmin={true}
        path="/admin/product/new"
        component={NewProduct}
      />

      <ProtectRoute
        exact
        isAdmin={true}
        path="/admin/product/:id"
        component={UpdateProduct}
      />

      <ProtectRoute
        exact
        isAdmin={true}
        path="/admin/orders"
        component={Orders}
      />

      <ProtectRoute
        exact
        isAdmin={true}
        path="/admin/order/:id"
        component={ProcessOrder}
      />

      <ProtectRoute
        exact
        isAdmin={true}
        path="/admin/users"
        component={UsersList}
      />

      <ProtectRoute
        exact
        isAdmin={true}
        path="/admin/user/:id"
        component={UpdateUser}
      />

      <ProtectRoute
        exact
        isAdmin={true}
        path="/admin/reviews"
        component={Reviews}
      />

      {stripeKey && (
        <Elements stripe={loadStripe(stripeKey)}>
          <ProtectRoute path="/process/payment" component={Payment} />
        </Elements>
      )}
    </Switch>
  );
};
