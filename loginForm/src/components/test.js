import React, { Component } from 'react'
import "../styles/test.css"
import Dropzone from 'react-dropzone'

class Test extends Component{
    render(){
        return(
            <div>
                    <a href="#" >
                        <img src="https://vignette.wikia.nocookie.net/mspaintadventures/images/a/a8/200px-Cronus_talksprite.png/revision/latest?cb=20120924232416&path-prefix=ru" alt="Album cover" tabindex="0" />
                    </a>
                
            </div>
        )
    }

}

class FullScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            accept: '',
            files: [],
            dropzoneActive: false
        }
    }

    onDragEnter() {
        this.setState({
            dropzoneActive: true
        });
    }

    onDragLeave() {
        this.setState({
            dropzoneActive: false
        });
    }

    onDrop(files) {
        this.setState({
            files,
            dropzoneActive: false
        });
    }

    render() {
        const { accept, files, dropzoneActive } = this.state;
        const overlayStyle = {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            padding: '2.5em 0',
            background: 'rgba(0,0,0,0.5)',
            textAlign: 'center',
            color: '#fff'
        };
        return (
            <Dropzone
                disableClick
                style={{ position: "relative" }}
                accept={accept}
                onDrop={this.onDrop.bind(this)}
                onDragEnter={this.onDragEnter.bind(this)}
                onDragLeave={this.onDragLeave.bind(this)}
            >
                {dropzoneActive && <div style={overlayStyle}>Drop files...</div>}
                <div>
                    <h1>My awesome app</h1>
                    <label htmlFor="mimetypes">Enter mime types you want to accept: </label>
                    
                    <Test />
                    <h2>Dropped files</h2>
                    <ul>
                        {
                            files.map((file, index) => <li key={index}>{file.name} - {file.size} bytes</li>)
                        }
                    </ul>

                </div>
            </Dropzone>
        );
    }
}


export default FullScreen
