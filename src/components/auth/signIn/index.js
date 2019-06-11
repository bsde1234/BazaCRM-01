import React, { Component } from 'react';
import { doSignInWithEmailAndPassword, sentVerifyUserEmail } from '../../firebase/fireAuthCRUD';
import { Link } from 'react-router-dom';




const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
    verifyEmail: false,
    emailWasSent: false
};

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
        this.resentEmailVerify = this.resentEmailVerify.bind(this);
    }

    onSubmit = event => {
        const { email, password } = this.state;

        doSignInWithEmailAndPassword(email, password)
            .then((user) => {
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
    resentEmailVerify() {
        sentVerifyUserEmail().then(() => {
            this.setState({
                emailWasSent: true
            })
        })
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value, error:'' });
    };

    render() {
        const { email, password, error, verifyEmail } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <>
                <div className="row">
                    <div className="col s12 ">
                        <div className="card ">
                            <div className="card-content ">
                                <span className="card-title center-align">Вход</span>
                                <div className="center-align" hidden={verifyEmail ? false : true}><h5>Пожалуйста подтвердите адресс ел. почты перейдя по ссылке в електронном письме. <br /><p hidden={this.state.emailWasSent ? true : false} className="blue-text text-darken-2" onClick={this.resentEmailVerify}>Выслать сообщение еще раз.</p><p hidden={!this.state.emailWasSent ? true : false}>Сообщение выслано повторно.</p></h5></div>
                                <form onSubmit={this.onSubmit} hidden={verifyEmail ? true : false} >

                                    <div className="input-field ">
                                        <label htmlFor="email2">Email адресс</label>
                                        <input
                                            id="email2"
                                            name="email"
                                            value={email}
                                            onChange={this.onChange}
                                            type="text"
                                        />
                                    </div>
                                    <div className="input-field ">
                                        <label htmlFor="password">Пароль</label>
                                        <input
                                            id="password"
                                            name="password"
                                            value={password}
                                            onChange={this.onChange}
                                            type="password"
                                        />
                                    </div>
                                    {error && <p className="center-align red-text">{error.message}<br/><br/></p>}
                                    <button className="waves-effect waves-light btn-small btnblock" disabled={isInvalid} type="submit">
                                        Вход
                                    </button>
                                    <br /><br />
                                    <div className="center-align"><Link to="/forgetPassword" className="brand-logo">Забыл пороль</Link></div>
                                    
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

            </>
        );
    }
}


export default SignInForm;
