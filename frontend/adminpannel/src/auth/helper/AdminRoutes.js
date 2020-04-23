import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {isAuthenticated} from "./index"

const AdminRoute=({ component:Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated() && isAuthenticated().user.admin ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  export default AdminRoute;