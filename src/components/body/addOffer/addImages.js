import React, { Component } from 'react'

export default class AddImages extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      uid: this.props.user.uid,
      files: [],
      error: ''
    });
    this.handleFiles = this.handleFiles.bind(this);
  }
  addPhoto() {
    document.getElementById('file').click();
  }
  handleFiles(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        if (i <= 4) {
          if (event.target.files[i].size < 5000000) {
            const img = document.createElement("img");
            img.src = window.URL.createObjectURL(event.target.files[i]);
            this.setState(prevState => ({
              files: [...prevState.files, img.src],
              error: ''
            }));
          } else {
            this.setState({
              error: 'Максимальное количество изображений.'
            })
          }
        } else {
          this.setState({
            error: 'Размер изображения не должен привышать 5 МБ.'
          })
        }

      }

    }
  }
  deleteImage(el) {
    console.log(el)
  }
  render() {
    const {
      files,
      error
    } = this.state;

    return (
      <div>
        <button type="button" className="btn grey darken-3 btnblock" name="action" onClick={this.addPhoto} hidden={files.length >= 5 ? true : false}><i className="fas fa-portrait"></i> Add Photo
            <i className="material-icons right"></i>
        </button>
        <div className="center-align red-text">{error}</div>
        <input
          id="file"
          hidden
          name="file"
          onChange={this.handleFiles}
          type="file"
          multiple
          accept="image/x-png,image/gif,image/jpeg"
        />
        <ul>
          {files.map((reptile, index) => <li key={index}> <img width="120px" className="responsive-img" src={reptile} alt="" /> </li>)}
        </ul>

      </div>
    )
  }
}
