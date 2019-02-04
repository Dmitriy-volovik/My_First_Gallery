import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { mapSTPPhoto, DeletePhotoQuery } from "../actionCreater";
import "../styles/modalForPhoto.css";
const customStyles = {
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

class ModalForPhoto extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: this.props.open,
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        this.subtitle.style.color = '#f00';
    }

    closeModal(e) {
        this.setState({ modalIsOpen: false });
    }

    render() {
        return (
            <div>

                <Modal
                    isOpen={this.props.open}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    className="main-form"
                    contentLabel="Example Modal"
                >

                    <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
                    <button onClick={this.closeModal}>close</button>
                    <div>I am a modal</div>
                    <button onClick={this.deletPhoto.bind(this)}>Delete Images</button>
                    <form className="main-form">
                        <img src={`http://localhost:8000/${this.props.photo.filename}`} alt="Где же фото" width="100%" tabIndex="0" />
                    </form>
                </Modal>
            </div>
        );
    }
    deletPhoto() {

        if (window.confirm('Do you really want to delete the photo?')) {
            var photoId = this.props.photo.id;
            let albumId = this.props.albumId;
            this.props.DeletePhotoQuery(photoId, albumId);
        } else {
            return false;
        }
    }
}
ModalForPhoto = connect(mapSTPPhoto, { DeletePhotoQuery })(ModalForPhoto)

export default ModalForPhoto