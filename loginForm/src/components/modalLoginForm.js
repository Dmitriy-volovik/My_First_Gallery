import React, { Component } from 'react'
import "../styles/createAlbum.css";
import LoginForm from "../loginForm";
import Modal from 'react-modal';
import "../styles/modalLoginForm.css";
// const customStyles = {
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)'
//     }
// };

Modal.setAppElement('#root')

class ModalLoginForm extends React.Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        this.subtitle.style.color = '#FFFFFF';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        return (
            <div className="button-registration">
                <button className="button-add-album btn btn-outline-success" onClick={this.openModal}>Log in</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    shouldCloseOnOverlayClick={false}
                    // style={customStyles}
                    className="main-block-login"
                    // className="Modal"
                    // overlayClassName="Overlay"
                    contentLabel="Example Modal"
                >
                    <div className="login-form">
                        <button className="exit-button" onClick={this.closeModal}>close</button>
                        <h2 ref={subtitle => this.subtitle = subtitle}>Add login and password</h2>
                        <LoginForm closeModal={this.closeModal}/>
                        
                    </div>     

                </Modal>
            </div>
        );
    }
    // addAlbum = async () => {
    //     var albumName = document.getElementById("album-name");
    //     var text2 = document.getElementById("album-descrip");
    //     var albumValue = albumName.value;
    //     var descriptionValue = text2.value;
    //     // console.log(`vot tyt - ${albumValue+descriptionValue}`);
    //     await addAlbumQuery({ title: albumValue, text: descriptionValue })
    //     // this.props.actionAddAlbum(this.title.value, this.text.value);
    // }
}

export default ModalLoginForm;