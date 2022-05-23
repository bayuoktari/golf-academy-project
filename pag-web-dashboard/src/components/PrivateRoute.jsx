import React from "react";
import { Route, useLocation, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute(props) {
  const user = useSelector((state) => state.user.isLogin);
  const location = useLocation();

  return (
    <Route {...props}>
      {user ? (
        props.children
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { referrer: location.pathname },
          }}
        />
      )}
    </Route>
  );
}
