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
} from "../Pages";
import ProtectRoute from "./protectRoute";

export default () => {
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
    </Switch>
  );
};
