import React, { Component } from 'react'
import { ErrorHandler } from '../../system/errorHandler';

export default class MainUserInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      file: null
    }
  }
  addPhoto() {
    document.getElementById('file').click();
  }
  handleFiles(event) {
    if (event.target.files.length && event.target.files["0"].size < 5000000) {
      const img = document.createElement("img");
      img.src = window.URL.createObjectURL(event.target.files["0"]);
      img.onload = function () {
        window.URL.revokeObjectURL(this.src);
      }
      document.getElementById('imageWrap').innerHTML = '';
      document.getElementById('imageWrap').appendChild(img);
      this.setState({
        file: true,
        error:{errorPhoto:null}
      })
    } else {
      event.target.value = '';
      let error = {code: "Max. size of photo - 5MB."};
      ErrorHandler(error).then(val => {
        this.setState(prevState => ({
          error: {
            ...prevState.error,
            errorPhoto: val
          }
        }));
      })
    }
  }
  clearInput() {
    document.getElementById('file').value = '';
    document.getElementById('imageWrap').innerHTML = '';
    this.setState({
      file: false
    })
  }

  render() {
    return (
      <div>
        {this.props.user.auth.uid}
        <input
            id="file"
            hidden
            name="file"
            onChange={this.handleFiles}
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
          />
          <p>{this.state.file}</p>
          <button type="button" className="btn grey darken-3" name="action" onClick={this.addPhoto} hidden={!this.state.file ? false : true}><i className="fas fa-portrait"></i> Add Photo
          <i className="material-icons right"></i>
          </button>
          <div id="imageWrap"></div>
          <div hidden={this.state.file ? false : true}>
            <span className="pointer" name="action" onClick={this.addPhoto} ><i className="fas fa-exchange-alt"></i> Change Photo
            <i className="material-icons right"></i>
            </span> | <span className="pointer" name="action" onClick={this.clearInput} ><i className="fas fa-trash-alt"></i> Remove Photo
            <i className="material-icons right"></i>
            </span>
          </div>
      </div>
    )
  }
}
