
import React from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";

export const  PrivateRoute = ({ component: Component, ...rest }) => { 
   


    return (
      <Route
        render={(history) => {
          if(rest.auth) {
            return <Component {...rest} {...history} />
          } else {
            return <Redirect
              to={{
                pathname: "/authentication",
                state: { from: history.location }
              }}
            />
          }}
        }
      />
    );
  }