import React, { Component } from "react"
import Dropzone from 'react-dropzone'
import { addPhotoQuery } from "../requests";
import { Link } from 'react-router-dom';


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
            <section>
                <div className="dropzone">
                    <Dropzone
                        onDrop={this.onDrop.bind(this)}
                        onFileDialogCancel={this.onCancel.bind(this)}
                    >
                        <p>Try dropping some files here, or click to select files to upload.</p>
                    </Dropzone>
                </div>
                <aside>
                    <h2>Dropped files</h2>
                    <ul>
                        {
                            this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                        }
                    </ul>
                </aside>
                <form>
                    <p>
                        <Link to={`/`}>
                            <input type="button" value="Domoj"/>
                        </Link>
                    </p>
                    </form>
                <button onClick={this.OnUpload.bind(this)}>upload</button>
            </section>
        );
    }

    OnUpload =() => {
        var dataPhotos = this.state.files;
        var data = new FormData()
        dataPhotos.forEach((photo,i)=>{
            data.append(`file`, photo)
            //data.append('user', 'hubot')
        })

        fetch('http://localhost:8000/upload', {
            method: 'POST',
            body: data
        }).then((responseData) => {
            return responseData.json()
        }).then((photos) =>{
            console.log(photos);
            photos.map((photos) =>{
                addPhotoQuery(photos)
            });
            // return photos;
        }).catch(error => console.log(error.message))
    }

}

export default Upload