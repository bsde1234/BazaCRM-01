import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { doSignOut } from '../firebase/fireAuthCRUD';

export const NavAction = (props) => {

    return (

        <nav className="grey darken-3 ">
            <div className="container">
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo">BAZA CRM</Link>
                    <ul className="right hide-on-med-and-down">
                        <li><NavLink activeClassName="activeLink" exact to='/addoffer'><i className="fas fa-plus" ></i> Добавить Объявление</NavLink></li>
                        <li><NavLink to='/message'><i className="far fa-paper-plane"></i> Сообщения</NavLink></li>
                        <li><NavLink activeClassName="activeLink" exact to='/testCompWrap'>testCompWrap</NavLink></li>
                        <li hidden={props.auth ? true : false}><NavLink to='/authentication'>Регистрация/Вход</NavLink></li>
                        <li className="navUserInfo" hidden={props.auth ? false : true}><NavLink to='/profile'>{props.auth && props.auth.displayName ? props.auth.displayName : 'Profile'}</NavLink></li>
                        <li hidden={props.auth ? false : true} onClick={doSignOut} className="red-text"><i style={{fontSize: '15px'}} className="fas fa-sign-out-alt"></i> Log Out</li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
