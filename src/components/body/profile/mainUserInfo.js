import React, { Component } from 'react';
import { ErrorHandler } from '../../system/errorHandler';
import { SaveInStorage, DeleteFile } from './../../firebase/filestorageCRUD/';
import { updateInFirestoreByKey } from '../../firebase/firestoreCRUD';

export default class MainUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      file: false,
      modified: false,
      error: ''
    }
    this.handleFiles = this.handleFiles.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
    this.savePhoto = this.savePhoto.bind(this);
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
        modified: true,
        image: event.target.files["0"],
        error: null,
        success: ''
      });
    } else {
      event.target.value = '';
      let error = { code: "Max. size of photo - 5MB." };
      ErrorHandler(error).then((text) => {
        this.setState({
          error: text
        })
      })
    }
  }

  savePhoto() {
    let img = document.getElementById('file').files["0"]
    const data = { image: img, name: 'User_' + this.props.user.uid }
    SaveInStorage(`images/users/${this.props.user.uid}/profilePic/`, this.props.user.uid, data).then((photoRef) => {
      photoRef.ref.getDownloadURL().then((downloadURL) => {
        const path = `users/`;
        let data = { 'userInfo.userPic.filePath': downloadURL, 'userInfo.userPic.name': photoRef.metadata.name }
        updateInFirestoreByKey(path, this.props.user.uid, data).then(() => {
          this.setState({
            modified: false,
            file: true,
            success: 'Picture updated successfuly.'
          })
        }).catch((error) => {
          ErrorHandler(error).then((text) => {
            this.setState({
              error: text
            })
          })
        });
      }).catch((error) => {
        ErrorHandler(error).then((text) => {
          this.setState({
            error: text
          })
        })
      })
    });
  }

  deletePhoto() {
    let filePath = `files/images/users/${this.props.user.uid}/profilePic/${this.props.user.userInfo.userPic.name}`;
    DeleteFile(filePath).then(() => {
      const path = `users/`;
      let data = { 'userInfo.userPic.filePath': '', 'userInfo.userPic.name': ''}
      updateInFirestoreByKey(path, this.props.user.uid, data).then(() => {
        this.setState({
          modified: false,
          file: false,
          success: 'Picture deleted successfuly.'
        });
        document.getElementById('file').value = '';
        document.getElementById('imageWrap').innerHTML = '';
      }).catch((error) => {
        ErrorHandler(error).then((text) => {
          this.setState({
            error: text
          })
        })
      });
    }).then(() => {
      this.setState({
        file: false,
        modified: false
      })
    }).catch((error) => {
      ErrorHandler(error).then((text) => {
        this.setState({
          error: text
        })
      })
    })
  }

  render() {
    const userInfo = this.props.user.userInfo
    const {
      file,
      modified,
      success
    } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col s12   ">
            <input
              id="file"
              hidden
              name="file"
              onChange={this.handleFiles}
              type="file"
              accept="image/x-png,image/gif,image/jpeg"
            />
            <button type="button" className="btn grey darken-3 btnblock" name="action" onClick={this.addPhoto} hidden={!file && userInfo.userPic.filePath === '' ? false : true}><i className="fas fa-portrait"></i> Добавить фото профиля 
              <i className="material-icons right"></i>
            </button>
            <div hidden={file || modified || userInfo.userPic.filePath!=='' ? false : true} className="center-align">
              <div id="imageWrap"><img src={userInfo.userPic.filePath} alt="user" /></div>
              <span className="pointer" name="action" onClick={this.addPhoto} ><i className="fas fa-exchange-alt"></i> Change
            <i className="material-icons right"></i>
              </span> | <span className="pointer" name="action" onClick={this.deletePhoto} ><i className="fas fa-trash-alt"></i> Remove
            <i className="material-icons right"></i>
              </span>
              <br />
              <button className="waves-effect waves-light btn-small btnblock" hidden={file && modified ? false : true} type="button" onClick={this.savePhoto} > Save</button>
              <p hidden={success !== '' ? false : true}>{success}</p>
            </div>

          </div>

          <div className="col s12 l12">
            <br/>
            <ul >
              <li><i className="fas fa-user col s1"></i><span className="col s11">{userInfo.name}</span> </li>
              <li><i className="fas fa-envelope col s1"></i><span className="col s11">{userInfo.email}</span></li>
              <li><i className="fas fa-mobile-alt col s1"></i><span className="col s11">{userInfo.phone}</span></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
