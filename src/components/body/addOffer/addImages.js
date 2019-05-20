import React, { Component } from 'react'

export default class AddImages extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      uid: this.props.user.uid,
      files:[]
    });
    this.handleFiles=this.handleFiles.bind(this);
  }
  addPhoto() {
    document.getElementById('file').click();
  }
  handleFiles(event) {
    if (event.target.files.length > 0 /*&& event.target.files["0"].size < 5000000 */) {
      for(let i = 0; i<event.target.files.length; i++){

        const img = document.createElement("img");
        img.src = window.URL.createObjectURL(event.target.files[i]);
        img.onload = function () {
          window.URL.revokeObjectURL(this.src);
        }
        document.getElementById('imageWrap').appendChild(img);
      }
    } 
  }
  render() {
    return (
      <div>
        <button type="button" className="btn grey darken-3 btnblock" name="action" onClick={this.addPhoto} ><i className="fas fa-portrait"></i> Add Photo
            <i className="material-icons right"></i>
        </button>
        <input
          id="file"
          hidden
          name="file"
          onChange={this.handleFiles}
          type="file"
          multiple
          accept="image/x-png,image/gif,image/jpeg"
        />
        <div id="imageWrap"></div>
      </div>
    )
  }
}
