
import React from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";

export const  AuthProtectedRoute = ({ component: Component, ...rest }) => { 
   


    return (
      <Route
        {...rest}
        render={(history) => {
          if(!rest.auth) {
            return <Component {...rest} {...history} />
          } else {
            return <Redirect
              to={{
                pathname: "/",
                state: { from: history.location }
              }}
            />
          }}
        }
      />
    );
  }