import { Switch, Route } from "react-router-dom";
import { Homepage, ProductDetails, Products, Authentication } from "../Pages";

export default () => {
  return (
    <Switch>
      <Route path="/" exact component={Homepage} />
      <Route path="/product/:id" component={ProductDetails} />
      <Route path="/products" exact component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route path="/login" component={Authentication} />
    </Switch>
  );
};
