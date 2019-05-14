import React, { Component } from 'react';
import { doPasswordReset } from '../../firebase/fireAuthCRUD';




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
        this.setState({ error });
      });


  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error,success } = this.state;

    const isInvalid = email === '';

    return (
        <>
            <div className="center-align" hidden={success?false:true}><h3>Ссылка на смену пороля отправленна Вам<br/>на адресс електронной почты.</h3></div>
            <form onSubmit={this.onSubmit} hidden={success?true:false}>
                <input
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
                />
                <button className="waves-effect btn" disabled={isInvalid} type="submit">
                Reset My Password
                </button>

                {error && <p>{error.message}</p>}
            </form>
      </>
    );
  }
}