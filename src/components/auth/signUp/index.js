import React, { Component } from 'react';
import './signUp.css';
import { doCreateUserWithEmailAndPassword, sentVerifyUserEmail } from '../../firebase/fireAuthCRUD';
import { ErrorHandler } from '../../system/errorHandler';
import { IMaskInput } from 'react-imask';
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
      phone,
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
            <label htmlFor="name">Full Name<span className="red-text">*</span></label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={this.onChange}
              type="text"

            />
          </div>

          <label htmlFor="phone">Phone Number<span className="red-text">*</span></label>
          <IMaskInput
            mask={'+{38\\0}(00)000-00-00'}
            lazy={false}
            name="phone"
            value={phone}
            onAccept={(value, mask) => {
              let data = { target: mask.el.input }
              data.target.value = "+" + mask.unmaskedValue;
              this.onChange(data)
            }}
          />

          <div className="input-field ">
            <label htmlFor="email">Email Address<span className="red-text">*</span></label>
            <input
              id="email"
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
            />
          </div>

          <div className="input-field ">
            <label htmlFor="passwordOne">Password<span className="red-text">*</span></label>
            <input
              id="passwordOne"
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
            />
          </div>

          <div className="input-field ">
            <label htmlFor="passwordTwo">Confirm Password<span className="red-text">*</span></label>
            <input
              id="passwordTwo"
              name="passwordTwo"
              value={passwordTwo}
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