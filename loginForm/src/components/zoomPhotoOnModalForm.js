import React, { Component } from "react";
import { render } from "react-dom";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class ZoomPhotoOnModal extends Component {
    constructor(props) {
        super(props);
        this.onCloseRequest = this.onCloseRequest.bind(this);
        this.state = {
            // photoIndex: 0,
            photoIndex: this.props.elementIndex,
            isOpen: false
        };
    }

    onCloseRequest(){
        this.props.parent.toggleModal();
    }
    componentWillReceiveProps(props){
        const {openState} = this.props;
        if(props.openState !== openState){
            this.setState({isOpen: props.openState})
        }
    }

    render() {
        const { photoIndex, isOpen } = this.state;
        let images = this.props.imagesArray.map(photo => {
            let srcPhoto = `http://localhost:8000/${photo.filename}`;
            console.log(srcPhoto);
            return srcPhoto;
        })
        return (
            <div>
                {/* <button type="button" onClick={() => this.setState({ isOpen: true })}>
                    Open Lightbox
        </button> */}

                {isOpen && (
                    <Lightbox
                        mainSrc={images[photoIndex]}
                        nextSrc={images[(photoIndex + 1) % images.length]}
                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                        onCloseRequest={this.onCloseRequest}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + images.length - 1) % images.length
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % images.length
                            })
                        }
                    />
                )}
            </div>
        );
    }
}

export default ZoomPhotoOnModal
