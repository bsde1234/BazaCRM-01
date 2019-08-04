
import React from "react";
import { Route } from "react-router-dom";

export const  PublicRoute = ({ component: Component, ...rest }) => { 
   


    return (
      <Route

        render={({ history }) => (<Component {...rest} {...history}/>)}

      />
    );
  }