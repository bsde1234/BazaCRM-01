import React, { Component } from 'react';
import { doSignInWithEmailAndPassword, sentVerifyUserEmail } from '../../firebase/fireAuthCRUD';
import { Link } from 'react-router-dom';




const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
    verifyEmail: false,
};

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;

        doSignInWithEmailAndPassword(email, password)
            .then((user) => { console.log(this.state)
                if (user && user.user.emailVerified)
                    this.setState({ ...INITIAL_STATE });
                else
                    this.setState({ verifyEmail: true });
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error, verifyEmail } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <>
                <div className="center-align" hidden={verifyEmail ? false : true}><h5>Пожалуйста подтвердите адресс ел. почты перейдя по ссылке в електронном письме. <br /><p className="blue-text text-darken-2" onClick={sentVerifyUserEmail}>Выслать сообщение еще раз.</p></h5></div>
                <form onSubmit={this.onSubmit} hidden={verifyEmail ? true : false} className="col s4 offset-s4">
                    <div className="center-align"><h5>Вход</h5></div>
                    <div className="input-field ">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            name="email"
                            value={email}
                            onChange={this.onChange}
                            type="text"
                        />
                    </div>
                    <div className="input-field ">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            value={password}
                            onChange={this.onChange}
                            type="password"
                        />
                    </div>

                    <button className="waves-effect waves-light btn-small btnblock" disabled={isInvalid} type="submit">
                        Sign In
                    </button>
                    <p></p>
                    <div className="center-align"><Link to="/forgetPassword" className="brand-logo">Забыл пороль</Link></div>
                    {error && <p>{error.message}</p>}
                </form>
            </>
        );
    }
}


export default SignInForm;
