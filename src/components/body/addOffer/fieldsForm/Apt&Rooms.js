import React from 'react';
import { compose, lifecycle } from "recompose";
import M from "materialize-css";
export const AptAndRoomsForm = compose(
    lifecycle({
        componentDidMount(){
            M.AutoInit();
        }
    }),
)(props =>
    
    <> {console.log(props)}
        <div className="input-field  withoutPadding">
            <select  className=" validate required" id="offerType" name="offer_type_2" onChange={props.handleChange}>
            <option value="" defaultValue>Выберите</option>
                <option value="Продажа">Продажа</option>
                <option value="Аренда">Аренда</option>
            </select>
            <label htmlFor="offer_type_2">Тип объявления <span className="red-text">*</span></label>
        </div>
        <div className="input-field  withoutPadding">
            <select  className=" validate required" id="building_type" name="building_type" onChange={props.handleChange}>
                <option value="" defaultValue>Выберите</option>
                <option value="Кварира">Кварира</option>
                <option value="Часть кваритры">Часть кваритры</option>
                <option value="Комната">Комната</option>
            </select>
            <label htmlFor="building_type">Тип объекта <span className="red-text">*</span></label>
        </div>
        <div className="input-field  withoutPadding">
            <select className=" validate data-required" id="building_type" name="building_type" onChange={props.handleChange}>
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
                <input type="number" id="level" required name="level" onChange={props.handleChange} maxLength="2" min="0" max={props.offerInfo.building_level} className="validate required" pattern="^-?[0-9]\d*\.?\d*$" />
                <label htmlFor="level">Этаж <span className="red-text">*</span></label>
            </div>
            <div className="col l5 m5 s12 right input-field noMarginPadding">
                <input type="number" id="building_level" required name="building_level" onChange={props.handleChange} min="0"  maxLength="2" className="validate required" pattern="^-?[0-9]\d*\.?\d*$" />
                <label htmlFor="building_level">Этажность <span className="red-text">*</span></label>
            </div>
            <ul className="col s12 m12 red-text noMarginPadding">
                {Number(props.offerInfo.level) > Number(props.offerInfo.building_level)?<li>Этаж не должен быть выше этажности.</li>:''}
                {Math.sign(props.offerInfo.level) === -1 || Math.sign(props.offerInfo.building_level) === -1?<li>Не должно быть отрицательным.</li>:''}
            </ul>
        </div>
        <div className="row  noMarginPadding squareFields">
            <div className="input-field marginLR-0  col m5 s12">
                <input type="number" id="total_square" required name="total_square" onChange={props.handleChange} min="0"   maxLength="3" className="validate required" pattern="^-?[0-9]\d*\.?\d*$" />
                <label htmlFor="total_square">Общая площадь<span className="red-text">*</span></label>
                M<sub>2</sub>
            </div>
            <ul className="col s12 m7 red-text ">
                {Number(props.offerInfo.total_square) <Number(props.offerInfo.kitchen_square)?<li>Не должно быть меньше площади кухни.</li>:''}
                {Math.sign(props.offerInfo.total_square) === -1?<li>Не должно быть отрицательным.</li>:''}
            </ul>
                
        </div>
        <div className="row  noMarginPadding squareFields">
            <div className="input-field marginLR-0  col m5 s12">
                <input type="number" id="kitchen_square" required name="kitchen_square" onChange={props.handleChange} min="0" max={props.offerInfo.total_square} maxLength="3" className="validate required" pattern="^-?[0-9]\d*\.?\d*$" />
                <label htmlFor="kitchen_square">Площадь кухни<span className="red-text">*</span></label>
                M<sub>2</sub>
            </div>
            <ul className="col s12 m7 red-text">
                {Number(props.offerInfo.total_square) <Number(props.offerInfo.kitchen_square)?<li>Не должно превышать общую площадь.</li>:''}
                {Math.sign(props.offerInfo.kitchen_square) === -1?<li>Не должно быть отрицательным.</li>:''}
            </ul>
        </div>
        <div className="input-field  ">
            <select required className=" validate" id="walls_type" name="walls_type" onChange={props.handleChange}>
                <option value="" defaultValue>Выберите</option>
                <option value="Царский дом">Царский дом</option>
                <option value="Сталинка">Сталинка</option>
                <option value="Хрущевка">Хрущевка</option>
            </select>
            <label htmlFor="walls_type">Тип стен </label>
        </div>
        
    </>
)