import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { doSignOut } from '../firebase/fireAuthCRUD';

export const NavAction = (props) => {

    return (

        <nav className="grey darken-3">
            <div className="container">
                <div className="nav-wrapper ">
                    <Link to="/" className="brand-logo">Admin CRM</Link>
                    <ul className="right">
                        <li><NavLink activeClassName="activeLink" exact to='/'>Image Galary</NavLink></li>
                        <li><NavLink activeClassName="activeLink" exact to='/uploadfile'>Upload Images</NavLink></li>
                        <li><NavLink activeClassName="activeLink" exact to='/testCompWrap'>testCompWrap</NavLink></li>
                        <li hidden={props.auth ? true : false}><NavLink to='/signUp'>Sign Up</NavLink></li>
                        <li hidden={props.auth ? true : false}><NavLink to='/signIn'>Sign In</NavLink></li>
                        <li className="navUserInfo" hidden={props.auth ? false : true}><NavLink to='/profile'>{props.auth ? props.auth.displayName : 'Profile'}</NavLink></li>
                        <li hidden={props.auth ? false : true} onClick={doSignOut} className="red-text"><i style={{fontSize: '15px'}} className="fas fa-sign-out-alt"></i> Log Out</li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
