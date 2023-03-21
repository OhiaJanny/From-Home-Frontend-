import React from "react";
import { Route, Redirect } from "react-router-dom";

const DashboardGuard = ({
  component: Component,
  auth,
  ...theRemainingProps
}) => {
  return (
    <Route
      {...theRemainingProps}
      render={() => {
        return auth ? <Component /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
};

export default DashboardGuard;