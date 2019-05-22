import React from "react";

import "./dragNdrop.css";


export default class DragNdrop extends React.Component {
    constructor() {
        super();
        this.state = ({
            files: [],
            error: ''
        });
        this.handleFiles = this.handleFiles.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.getImages = this.getImages.bind(this);

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
                        img.name = event.target.files[i].name;
                        const data = event.target.files[i];
                        data.src = window.URL.createObjectURL(event.target.files[i]);
                        this.setState(prevState => ({
                            files: [...prevState.files, data],
                            error: ''
                        }),()=>{
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
        }, () => {
            // RETURN STATE TO PARENT VIA  addImage MATHOD. 
            this.props.addImage(this.state.files)
        });
    }
    onDragStart = (e, index) => {
        this.draggedItem = this.state.files[index];
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    };

    onDragOver = index => {
        const draggedOverItem = this.state.files[index];
        // if the item is dragged over itself, ignore
        if (this.draggedItem === draggedOverItem) {
            return;
        }
        // filter out the currently dragged item
        let files = this.state.files.filter(item => item !== this.draggedItem);

        // add the dragged item after the dragged over item
        files.splice(index, 0, this.draggedItem);
        this.setState({ files });
    };

    onDragEnd = () => {
        this.draggedIdx = null;
        this.props.addImage(this.state.files)
    };
    getImages(images) {
        this.setState({
            files: images
        })
    }
    render() {
        const {
            files,
            error
        } = this.state;

        return (
            <div>
                <div className="left-align">
                    <button type="button" className="btn grey darken-3 " name="action" onClick={this.addPhoto} hidden={files.length >= 5 ? true : false}> Add Photo</button>
                </div>
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
                <div className="dragNdrop">
                    <ul>
                        {this.state.files.map((item, idx) => (
                            <li key={idx} onDragOver={() => this.onDragOver(idx)} onClick={this.deleteImage}>
                                <img src={item.src}
                                    alt='altText'
                                    width="120px"
                                    className="drag"
                                    draggable
                                    onDragStart={e => this.onDragStart(e, idx)}
                                    onDragEnd={this.onDragEnd}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

