import React, { Component } from 'react'

export default class AddImages extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      files: [],
      error: ''
    });
    this.handleFiles = this.handleFiles.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    
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
              files: [...prevState.files, img],
              error: ''
            }), ()=>{
              // RETURN STATE TO PARENT VIA  addImage MATHOD. 
              this.props.addImage(this.state.files)
            });
          } else {
            this.setState({
              error: 'Размер изображения не должен привышать 5 МБ.'
            })
          }
        } else {
          this.setState({
            error: 'Максимальное количество изображений.'
          })
        }
      }
    }
  }
  deleteImage(event) {
      let src = event.target.getAttribute('src');
      this.setState({
        error: '',
        files: this.state.files.filter((val) => val.src !== src)
      });
  }
  render() {
    const {
      files,
      error
    } = this.state;
    return (
      <div>
        <button type="button" className="btn grey darken-3 " name="action" onClick={this.addPhoto} hidden={files.length >= 5 ? true : false}> Add Photo</button>
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
        <br/>
        <ul className="flexInlineList" hidden={files?false:true}>
          {files.map((reptile, index) => <li key={index} onClick={this.deleteImage}> <img width="120px" className="responsive-img" src={reptile.src} alt="" /> </li>)}
        </ul>

      </div>
    )
  }
}
