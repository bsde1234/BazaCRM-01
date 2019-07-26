import React from 'react';
import { formatDate } from '../../../system/formatingData';
export const OfferDetailsInfo = (props) => {

    function IfExist(data) {
        if (data && data !== undefined &&  data !== '') { return true } else { return false };
    }

    return (

        <>

            <h6 className="bold link"><i className="fas fa-map-marker-alt"></i> {IfExist(props.location.strAddress.route)&& props.location.strAddress.route} {IfExist(props.location.strAddress.street_number)&& props.location.strAddress.street_number + ", "}{IfExist(props.location.strAddress.locality)&& "город " + props.location.strAddress.locality + ", "} {IfExist(props.location.strAddress.administrative_area_level_1)&& props.location.strAddress.administrative_area_level_1 }</h6>

            <ul className="col s12 left noMarginPadding">
                
                {IfExist(props.data_created) && <li><i className="far fa-calendar-alt"></i> Опубликованно: {formatDate(new Date(props.data_created.seconds * 1000))}</li>} 
                {IfExist(props.description) && <li> <p> {props.description}</p></li>}
                {IfExist(props.for_split_rent) ? <li>Для совместной аренды: <i className="fas fa-check"></i> </li>: <li>Для совместной аренды: <i className="fas fa-times"></i></li>}
                {IfExist(props.no_commission) ? <li>Без комиссии: <i className="fas fa-check"></i> </li>: <li>Без комиссии: <i className="fas fa-times"></i></li>}
                {IfExist(props.ready_for_rielters) ? <li>Тогов сотрудничить с риелторами: <i className="fas fa-check"></i> </li>: <li>Тогов сотрудничить с риелторами: <i className="fas fa-times"></i></li>}
                {IfExist(props.building_level) && <li>Этажность: {props.building_level}</li>}
                {IfExist(props.level) && <li>Этаж: {props.level}</li>}
                {IfExist(props.total_square) && <li>Общая площадь: {props.total_square} М<sup>2</sup></li>}
                {IfExist(props.kitchen_square) && <li>Площадь кухни: {props.kitchen_square} М<sup>2</sup></li>}
                {IfExist(props.building_type) && <li>Тип квартиры: {props.building_type} </li>}
                {IfExist(props.walls_type) && <li>Тип стен: {props.walls_type} </li>}


            </ul>
        </>

    )
}