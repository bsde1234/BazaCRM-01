import React from 'react';
import SignUpForm from '../signUp/';
import SignInForm from '../signIn/';
export default function Authentication() {

        return (
            <div className="row">
                <br/>
                <div title="Регистрация"  className="col m6">
                    <SignUpForm />
                </div>
                <div title="Вход" className="col m6 ">
                    <SignInForm />
                </div>
            </div>
        )
    
}
