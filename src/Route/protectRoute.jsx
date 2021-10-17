import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Loader from "../Layout/Loader";

function ProtectRoute({ component: Component, ...rest }) {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <React.Fragment>
      {!loading && (
        <Route
          {...rest}
          render={(props) => {
            if (!isAuthenticated) {
              return <Redirect to="/login" />;
            }
            return <Component {...props} />;
          }}
        />
      )}
    </React.Fragment>
  );
}

export default ProtectRoute;
