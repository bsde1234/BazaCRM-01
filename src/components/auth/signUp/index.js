import React, { Component } from 'react';
import './signUp.css';
import { doCreateUserWithEmailAndPassword, sentVerifyUserEmail } from '../../firebase/fireAuthCRUD';
import { ErrorHandler } from '../../system/errorHandler';
import InputMask from 'react-input-mask';
import { saveInFirestoreByKey } from '../../firebase/firestoreCRUD';

const INITIAL_STATE = {
  name: '',
  email: '',
  phone: '',
  passwordOne: '',
  passwordTwo: '',
  file: false,
  error: '',
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      success: false
    };

  }

  onSubmit = event => {
    event.preventDefault();
    const { email, passwordOne, phone, name } = this.state;
    doCreateUserWithEmailAndPassword(email, passwordOne, name, phone)
      .then((data) => {
        let userInfo = { userInfo: { email, name, phone, userPic: { filePath: '', name: '' } } }
        saveInFirestoreByKey(`users/`, data.user.uid, userInfo).catch(error => {
          ErrorHandler(error).then(error => {
            this.setState({
              error
            })
          })
        }).then(() => {
          sentVerifyUserEmail().then(() => {
            this.setState({
              success: true
            })
          })

        }).catch(error => {
          ErrorHandler(error).then(error => {
            this.setState({
              error
            })
          })
        })

      })
      .catch(error => {
        ErrorHandler(error).then(error => {
          this.setState({
            error
          })
        })
      })
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {

    const {
      name,
      email,
      passwordOne,
      passwordTwo,
      error,
      success
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      name === '';

    return (
      <>

        <div hidden={success ? false : true} className="center-align"><h4>Спасибо за регистрацию.<br />Подтвердите регистрацию перейдя по ссылке на почте {email}.</h4></div>
        <form hidden={success ? true : false} onSubmit={this.onSubmit} className="col s4 offset-s4">
          <div className="center-align"><h5>Регистрация</h5></div>
          <div className="input-field ">
            <label htmlFor="name">Полное имя<span className="red-text">*</span></label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={this.onChange}
              type="text"
              className="validate"
              maxLength="80"
              minLength="5"
            />
          </div>
          <div className="input-field ">
          <label htmlFor="phone">Phone Number<span className="red-text">*</span></label>
          <InputMask name="phone" mask={'+380(99)999-99-99'} maskChar=" " onChange={this.onChange} />
          </div>
          <div className="input-field ">
            <label htmlFor="email">Email Address<span className="red-text">*</span></label>
            <input
              id="email"
              name="email"
              onChange={this.onChange}
              type="email"
              className="validate"
            />
          </div>

          <div className="input-field ">
            <label htmlFor="passwordOne">Password<span className="red-text">*</span></label>
            <input
              id="passwordOne"
              name="passwordOne"
              onChange={this.onChange}
              type="password"
            />
          </div>

          <div className="input-field ">
            <label htmlFor="passwordTwo">Confirm Password<span className="red-text">*</span></label>
            <input
              id="passwordTwo"
              name="passwordTwo"
              onChange={this.onChange}
              type="password"
            />
          </div>

          <div className="red-text canter-align">
            {error}
          </div>

          <button className="waves-effect waves-light btn-small btnblock" disabled={isInvalid} type="submit">
            Sign Up
          </button>

        </form>
      </>
    );
  }
}




export default SignUpForm;