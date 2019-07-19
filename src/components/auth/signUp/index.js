import React, { Component } from 'react';
import './signUp.css';
import { doCreateUserWithEmailAndPassword, sentVerifyUserEmail } from '../../firebase/fireAuthCRUD';
import { ErrorHandler } from '../../system/errorHandler';
import InputMask from 'react-input-mask';
import { DatePicker } from 'react-materialize';
import { saveInFirestoreByKey } from '../../firebase/firestoreCRUD';
import M from "materialize-css";
const INITIAL_STATE = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
  rieltorStartDate: '',
  userType: 'Обычный пользователь',
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
    const { email, passwordOne, phone, name, userType, lastName, rieltorStartDate } = this.state;
    doCreateUserWithEmailAndPassword(email, passwordOne, name, phone)
      .then((data) => {
        let userInfo = { userInfo: { email, name, lastName, rieltorStartDate, phone, userType, userPic: { filePath: '', name: '' }, date_of_creation: new Date() } }
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
  componentDidMount() {
    // Auto initialize all the things!
    M.AutoInit();
  }
  render() {

    const {
      name,
      lastName,
      email,

      error,
      success,
      userType
    } = this.state;


    return (
      <>



        <div className="row">
          <div className="col s12 ">
            <div className="card ">
              <div className="card-content">
                <span className="card-title center-align">Регистрация</span>
                <div hidden={success ? false : true} className="center-align"><h4>Спасибо за регистрацию.<br />Подтвердите регистрацию перейдя по ссылке на почте {email}.</h4></div>
                <form hidden={success ? true : false} onSubmit={this.onSubmit} className="">

                  <div className="input-field  ">
                    <select className=" validate" id="userType" name="userType" onChange={this.onChange} >
                      <option value="Обычный пользователь" defaultValue >Обычный пользователь</option>
                      <option value="Риелтор">Риелтор</option>
                      <option value="Компания">Компания</option>
                    </select>
                    <label htmlFor="userType">Тип Пользователя<span className="red-text">*</span></label>
                  </div>

                  {userType === 'Обычный пользователь' ? <ul ><li className="green-text"><i className="far fa-check-circle"></i>  5 бессплатных обьявлений.</li><li className="green-text"><i className="far fa-check-circle"></i>  Статистика обьявлений.</li><li className="green-text"><i className="far fa-check-circle"></i>  Пидписки на обьявления компании.</li></ul> : ''}
                  {userType === 'Риелтор' ? <ul ><li className="green-text"><i className="far fa-check-circle"></i>  3 бессплатных обьявления.</li><li className="green-text"><i className="far fa-check-circle"></i>  Расширенная статистика обьявлений.</li><li className="green-text"><i className="far fa-check-circle"></i>  Добавление в компанию.</li><li className="red-text"><i className="far fa-check-circle"></i>  Ежимесячная плата: 9.99$ .</li></ul> : ''}
                  {userType === 'Компания' ? <ul ><li className="green-text"><i className="far fa-check-circle"></i>  Добавление сотрудников.</li><li className="green-text"><i className="far fa-check-circle"></i>  Ежимесячная плата для сотрудников составляет 5.99$.</li><li className="green-text"><i className="far fa-check-circle"></i>  Стасистика по всем сотрудникам.</li><li className="red-text"><i className="far fa-check-circle"></i>  Ежимесячная плата: 12.99$ .</li></ul> : ''}


                  <div className="input-field ">
                    <label htmlFor="name">Имя<span className="red-text">*</span></label>
                    <input
                      id="name"
                      name="name"
                      value={name}
                      onChange={this.onChange}
                      type="text"
                      className="validate"
                      maxLength="80"
                      minLength="5"
                      required
                    />
                  </div>
                  <div className="input-field ">
                    <label htmlFor="lastName">Фамилия<span className="red-text">*</span></label>
                    <input
                      id="lastName"
                      name="lastName"
                      value={lastName}
                      onChange={this.onChange}
                      type="text"
                      className="validate"
                      maxLength="80"
                      minLength="5"
                      required
                    />
                  </div>
                  {userType === 'Риелтор' ?
                      <div className="row datePicker noMarginPadding">
                        <DatePicker className="validate" id='rieltorStartDate' name="rieltorStartDate" children={<label htmlFor="rieltorStartDate">Дата начала риелторской деятельности<span className="red-text">*</span></label>} required  options={{
                        format: 'dd / m / yyyy',min: new Date(1950,1,1),autoClose: true, i18n: {
                          months:
                            [
                              'Январь',
                              'Февраль',
                              'Март',
                              'Апрель',
                              'Май',
                              'Июнь',
                              'Июль',
                              'Август',
                              'Сентябрь',
                              'Октябрь',
                              'Ноябрь',
                              'Декабрь'
                            ], 
                          weekdaysAbbrev: 
                            ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],cancel:'Закрыть'}
                        }
                      } />
                      </div>
                      :'' }

                        

                        <label htmlFor="phone">Phone Number<span className="red-text">*</span></label>
                        <InputMask className="validate" required id="phone" alwaysShowMask={true} name="phone" mask="+380 (99) 999-99-99" onChange={this.onChange}>
                        </InputMask>
                        

                      <div className="input-field ">
                        <label htmlFor="email">Email Address<span className="red-text">*</span></label>
                        <input
                          id="email"
                          name="email"
                          onChange={this.onChange}
                          type="email"
                          className="validate"
                          required
                        />
                      </div>

                      <div className="input-field ">
                        <label htmlFor="passwordOne">Password<span className="red-text">*</span></label>
                        <input
                          required
                          id="passwordOne"
                          name="passwordOne"
                          onChange={this.onChange}
                          type="password"
                        />
                      </div>

                      <div className="input-field ">
                        <label htmlFor="passwordTwo">Confirm Password<span className="red-text">*</span></label>
                        <input
                          required
                          id="passwordTwo"
                          name="passwordTwo"
                          onChange={this.onChange}
                          type="password"
                        />
                      </div>

                      <div className="red-text canter-align">
                        {error}
                      </div>

                      <button className="waves-effect waves-light btn-small btnblock" type="submit">
                        Регистрация
          </button>

                </form>
              </div>
    
            </div>
              </div>
            </div>

      </>
          );
        }
      }
      
      
      
      
export default SignUpForm;