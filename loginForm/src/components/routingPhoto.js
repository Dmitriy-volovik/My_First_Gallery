import React, { Component } from "react"
import Dropzone from 'react-dropzone'
import "../styles/routingPhoto.css"


class Upload extends Component{
    constructor() {
        super()
        this.state = { files: [] }
    }

    onDrop(files) {
        this.setState({
            files
        });
    }

    onCancel() {
        this.setState({
            files: []
        });
    }


    render() {
        return (
            <section className="dropzone-section">
                <div className="dropzone">
                    <Dropzone
                        onDrop={this.onDrop.bind(this)}
                        onFileDialogCancel={this.onCancel.bind(this)}
                    >
                        <p className="drop-p">Try dropping some files here, or click to select files to upload.</p>
                    </Dropzone>
                </div>
                <aside>
                    <p>Dropped files</p>
                    <ul>
                        {
                            this.state.files.map(f => 
                                <li key={f.name}>
                                    {f.name} - {f.size} bytes
                                </li>)
                        }
                    </ul>
                </aside>

                <button className="btn btn-outline-secondary" onClick={this.OnUpload.bind(this)}>upload</button>
            </section>
        );
    }

    OnUpload = function() {

        let self = this;
        var dataPhotos = this.state.files;
        var data = new FormData()
        dataPhotos.forEach((photo,i)=>{
            data.append(`file`, photo)
        })

        fetch('http://localhost:8000/upload', {
            method: 'POST',
            body: data
        }).then((responseData) => {
            return responseData.json()
        }).then((photos) =>{
            console.log(photos);
            if (typeof self.props.onUpload === 'function'){
                self.props.onUpload(photos)
            }

        }).catch(error => console.log(error.message))
    }

}

export default Upload