import React, { Component } from 'react'
import AddImages from './addImages';
import M from "materialize-css";

const INITIAL_STATE = {
    title: '',
    files: [],
    isInvalid: false,
    offer_type_1: ''
};

export default class AddOfferMainForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...INITIAL_STATE,
            user: this.props.user
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addImagesHandler = this.addImagesHandler.bind(this);
        
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) { 
        event.preventDefault();
        this.setState({
            ...INITIAL_STATE
        })
    }

    addImagesHandler(images) {
        this.setState({
            files: images
        })
    }
    componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();
    }
    render() {
        console.log(this.state);
        return (
            <form onSubmit={this.handleSubmit} className="col s8 offset-s2 center-align">
                <div className="input-field">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={this.state.title}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="input-field col s12">
                    <select name="offer_type_1" onChange={this.handleChange}>
                        <option value="" disabled defaultValue >Тип Недвижимости</option>
                        <option value="1">Дом</option>
                        <option value="2">Участок</option>
                        <option value="3">Коммерческая недвижимость</option>
                    </select>
                    <label>Materialize Select</label>
                </div>
                <div>
                    <AddImages user={this.state.user} addImage={this.addImagesHandler} />
                </div>
                <button className="waves-effect waves-light btn-small " disabled={this.state.isInvalid} type="submit">
                    Сохранить
                </button>
                <button className="waves-effect waves-light btn-small " disabled={this.state.isInvalid} type="submit">
                    Опубликовать
                </button>
            </form>
        );
    }
}

