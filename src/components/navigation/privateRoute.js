
import React from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";

export const  PrivateRoute = ({ component: Component, ...rest }) => { 
   


    return (
      <Route
        {...rest}
        render={(props) => {
          if(rest.auth) {
            return <Component {...rest} />
          } else {
            return <Redirect
              to={{
                pathname: "/authentication",
                state: { from: props.location }
              }}
            />
          }}
        }
      />
    );
  }