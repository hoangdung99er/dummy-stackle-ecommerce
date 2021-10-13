import { Switch, Route } from "react-router-dom";
import { Homepage } from "../Pages";

export default () => {
  return (
    <Switch>
      <Route path="/" exact component={Homepage} />
    </Switch>
  );
};
