import React, { Component } from 'react';
import { doPasswordReset } from '../../firebase/fireAuthCRUD';
import { ErrorHandler } from '../../system/errorHandler';




const INITIAL_STATE = {
  email: '',
  error: null,
  success: false
};

export default class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();
    const { email } = this.state;

    doPasswordReset(email)
      .then((data) => {
        this.setState({ success: true });
      })
      .catch(error => {
        
        ErrorHandler(error).then((text)=>{
          console.log(text)
          this.setState({ error: text });
        })
        
      });


  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error,success } = this.state;

    const isInvalid = email === '';

    return (
        <div className="col s4 offset-s4">
            <div className="center-align"><h5>Сброс пороля</h5></div>
            <div className="center-align" hidden={success?false:true}><br/> <h4>Ссылка на смену пороля отправленна Вам<br/>на адресс електронной почты.</h4></div>
            <form onSubmit={this.onSubmit} hidden={success?true:false}>
              <div className="input-field ">
                <label htmlFor="email">Email Address</label>
                <input
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  type="text"
                />
                {error && <span className="red-text">{error}</span>}
              </div>
                <button className="waves-effect btn btnblock" disabled={isInvalid} type="submit">
                Reset My Password
                </button>
            </form>
      </div>
    );
  }
}