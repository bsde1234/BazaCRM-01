import React, { Component } from 'react';
import SignUpForm from '../signUp/';
import SignInForm from '../signIn/';
import { Tabs, Tab } from 'react-materialize';
export default class Authentication extends Component {
    render() {
        return (
            <div className="row">

                <br/>

                        <div title="Регистрация"  className="col m6">
                            <SignUpForm />
                        </div>
                        <div title="Вход" className="col m6 ">
                            <SignInForm />
                        </div>


                    <div >

                        <Tabs options={{swipeable: true}}>
                            <Tab title="Регистрация">
                                <SignUpForm />
                            </Tab>
                            <Tab title="Вход" >
                                <SignInForm />
                            </Tab>
                        </Tabs>

                    </div>
            </div>
        )
    }
}
