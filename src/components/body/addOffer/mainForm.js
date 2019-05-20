import React, { Component } from 'react'
import AddImages from './addImages';


const INITIAL_STATE = {
    title: '',
    files: [],
    isInvalid: false
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
    }

    handleChange(event) {
        this.setState({ title: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            ...INITIAL_STATE
        })
    }

    addImagesHandler(el){
        console.log(el);
    }
    render() {
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
                <div>
                    <AddImages user={this.state.user} addImage={this.addImageHandler} />
                </div>
                <button className="waves-effect waves-light btn-small btnblock" disabled={this.state.isInvalid} type="submit">
                    Sign Up
                </button>
            </form>
        );
    }
}
