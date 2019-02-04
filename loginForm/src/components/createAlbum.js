import React, { Component } from 'react'
import "../styles/createAlbum.css";
import { addAlbumQuery } from "../requests";
import Modal from 'react-modal';

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

class CreateAlbum extends React.Component {
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
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#FFFFFF';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        return (
            <div>
                <button className="btn btn-outline-success" onClick={this.openModal}>Add Album</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    shouldCloseOnOverlayClick={false}
                    // style={customStyles}
                    className="main-block"
                    // className="Modal"
                    // overlayClassName="Overlay"
                    contentLabel="Example Modal"
                >
                    <button className="close-button" onClick={this.closeModal}>close</button>
                    <h2 ref={subtitle => this.subtitle = subtitle}>Enter data to create an album</h2>
                    <div></div>
                    <form className="add-album">
                        <input type="text" id="album-name" placeholder="Album name" ref={c => this.title = c} /><br/>
                        <input type="text" id="album-descrip" placeholder="description" ref={c => this.text = c} /><br />
                        <button className="knopka btn btn-primary" onClick={this.addAlbum.bind(this)} >Submit</button>
                    </form>
                </Modal>
            </div>
        );
    }
    addAlbum = async() => {
        var albumName = document.getElementById("album-name");
        var text2 = document.getElementById("album-descrip");
        var albumValue = albumName.value;
        var descriptionValue = text2.value;
        await addAlbumQuery({title: albumValue, text: descriptionValue})
    }
}

export default CreateAlbum;