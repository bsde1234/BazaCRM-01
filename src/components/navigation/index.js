import React from 'react';
import { AuthUserContext } from '../auth/session';
import {NavAction} from './navAction';

const Navbar = () => {
    return (
      <AuthUserContext.Consumer>
        {authUser =><NavAction auth={authUser}/> }
      </AuthUserContext.Consumer>
    )
}

export default Navbar;











