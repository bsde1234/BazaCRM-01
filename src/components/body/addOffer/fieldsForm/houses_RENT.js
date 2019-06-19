import React from 'react';
import { compose, lifecycle } from "recompose";
import M from "materialize-css";
const HousesRentForm = compose(
    lifecycle({
        componentDidMount(){
            M.AutoInit();
        }
    })
)(props =>

    
    <> 
        <div className="input-field  withoutPadding">
            <select required className=" validate" id="offerType" name="offer_type_2" onChange={props.handleChange}>
                <option value="" defaultValue>Тип сделки.</option>
                <option value="Продажа">Продажа</option>
                <option value="Аренда">Аренда</option>
            </select>
            <label htmlFor="offer_type_2">Тип объявления <span className="red-text">*</span></label>
        </div>
        <div className="input-field  withoutPadding">
            <select required className=" validate" id="building_type" name="building_type" onChange={props.handleChange}>
                <option value="" defaultValue>Выберите</option>
                <option value="Кварира">Кварира</option>
                <option value="Часть кваритры">Часть кваритры</option>
                <option value="Комната">Комната</option>
            </select>
            <label htmlFor="building_type">Тип объекта <span className="red-text">*</span></label>
        </div>
        <div className="input-field  withoutPadding">
            <select className=" validate" id="building_type" name="building_type" onChange={props.handleChange}>
                <option value="" defaultValue>Выберите</option>
                <option value="Царский дом">Царский дом</option>
                <option value="Сталинка">Сталинка</option>
                <option value="Хрущевка">Хрущевка</option>
                <option value="Чешка">Чешка</option>
                <option value="Гостинка">Гостинка</option>
                <option value="Совмин">Совмин</option>
                <option value="Общежитие">Общежитие</option>
                <option value="Жилой фонд 80-90-е">Жилой фонд 80-90-е</option>
                <option value="Жилой фонд 91-2000-е">Жилой фонд 91-2000-е</option>
                <option value="Жилой фонд 2001-2010-е">Жилой фонд 2001-2010-е</option>
                <option value="Жилой фонд от 2011 г.">Жилой фонд от 2011 г.</option>
            </select>
            <label htmlFor="building_type">Тип дома </label>
        </div>
        <p>
            <label>
                <input type="checkbox" className="filled-in" name="no_commission" onChange={props.handleChange} />
                <span>Без комиссии</span>
            </label>
        </p>

        <p>
            <label>
                <input type="checkbox" className="filled-in" name="ready_for_rielters" onChange={props.handleChange} />
                <span>Готов сотрудничать с риэлторами</span>
            </label>
        </p>
        <p>
            <label>
                <input type="checkbox" className="filled-in" name="for_split_rent" onChange={props.handleChange} />
                <span>Для совместной аренды</span>
            </label>
        </p>
        <div className="row noMarginPadding">
            <div className="col l5 m5 s12 left input-field noMarginPadding">
                <input type="tel" id="level" required name="level" onChange={props.handleChange} maxLength="2" className="validate" pattern="^-?[0-9]\d*\.?\d*$" />
                <label htmlFor="level">Этаж <span className="red-text">*</span></label>
            </div>
            <div className="col l5 m5 s12 right input-field noMarginPadding">
                <input type="tel" id="building_level" required name="building_level" onChange={props.handleChange} maxLength="2" className="validate" pattern="^-?[0-9]\d*\.?\d*$" />
                <label htmlFor="building_level">Этажность <span className="red-text">*</span></label>
            </div>
        </div>
        <div className="row  noMarginPadding squareFields">
            <div className="input-field marginLR-0  col s5">
                <input type="text" id="total_square" required name="total_square" onChange={props.handleChange}  maxLength="3" className="validate" pattern="^-?[0-9]\d*\.?\d*$" />
                <label htmlFor="total_square">Общая площадь<span className="red-text">*</span></label>
            </div>
            <div className="col s1 marginLR-0">
                M<sub>2</sub>
            </div>
        </div>
        <div className="row withoutPadding noMarginPadding squareFields">
            <div className="input-field marginLR-0  col s5">
                <input type="text" id="kitchen_square" required name="kitchen_square" onChange={props.handleChange}  maxLength="3" className="validate" pattern="^-?[0-9]\d*\.?\d*$" />
                <label htmlFor="kitchen_square">Площадь кухни<span className="red-text">*</span></label>
            </div>
            <div className="col s1 marginLR-0">
                M<sub>2</sub>
            </div>
        </div>
        <div className="input-field  withoutPadding">
            <select className=" validate" id="walls_type" name="walls_type" onChange={props.handleChange}>
                <option value="" defaultValue>Выберите</option>
                <option value="Царский дом">Царский дом</option>
                <option value="Сталинка">Сталинка</option>
                <option value="Хрущевка">Хрущевка</option>

            </select>
            <label htmlFor="walls_type">Тип стен </label>
        </div>
        
    </>
)

export default HousesRentForm;

