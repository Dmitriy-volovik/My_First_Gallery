import React, { Component } from "react";
import { connect } from 'react-redux';
import "../styles/photos.css";
import { mapSTPPhoto, photosFetch, DeletePhotoQuery } from "../actionCreater";
import { Link } from 'react-router-dom';
import Upload from "./routingPhoto";
import ZoomPhotoOnModal from './zoomPhotoOnModalForm'

import { addPhotoQuery } from "../requests";

import resizeAllGridItems from "../masonryLayout"


class Photos extends Component {

    componentDidMount(){
        this.props.photosFetch(this.props.match.params.id)
    }

    onUpload(photos){
        Promise.all(photos.map(element => addPhotoQuery(element, this.props.match.params.id)))
            .then(() => this.props.photosFetch(this.props.match.params.id))
    }

    render() {
        if (this.props.fetchStatusPhotos.status === "RESOLVED") {
            return (
                <div className="main-over-main">
                    <Upload onUpload={this.onUpload.bind(this)} />
                    <p>
                        <Link to={`/`}>
                            <img src="/images/ToHomeFromAlbumMin.png" alt="nety Photo"/>
                        </Link>
                    </p>
                    <div className="main-div-ph grid" onLoad={() => resizeAllGridItems()}>
       
                        {this.props.fetchStatusPhotos.payload.map((photo, index) => <Photo photo={photo} albumId={this.props.match.params.id}
                            photoArray={this.props.fetchStatusPhotos.payload} idElement={index}
                        />)}
                    </div>
                </div>
          
            )
        }

        return <img src='https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' />
    }
}
Photos = connect(mapSTPPhoto, {photosFetch})(Photos)

export class Photo extends Component {
    constructor() {
        super();
        
        this.state = {
            isOpen: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
    }
    
    toggleModal() {
        this.setState(state => ({
            isOpen: !state.isOpen
        }));
    }

    render() {
        return (
            <div id="photoFrame" className="photo item" >
                <ZoomPhotoOnModal imagesArray={this.props.photoArray} elementIndex={this.props.idElement} openState={this.state.isOpen}
                parent={this}
                />
                <div className="content" onClick={this.toggleModal}>

                    <img src={`http://localhost:8000/${this.props.photo.filename}`}
                     alt="Где же фото" width="100%" className="wallpaper_img" tabIndex="0"/>
                    
                </div>
                <button className="btn btn-outline-danger btn-sm custom-but" onClick={this.deletPhoto.bind(this)}>Delete Images</button>
            </div>
        )
    }
    deletPhoto () {

        if (window.confirm('Do you really want to delete the photo?')) {
            var photoId = this.props.photo.id;
            let albumId = this.props.albumId;
            this.props.DeletePhotoQuery(photoId, albumId);
        } else {
            return false;
        }
    }
}
Photo = connect(mapSTPPhoto, { DeletePhotoQuery})(Photo)
// function painting(props) {
//       return  goToPhoto(props).then(finalUrl => {
//             return finalUrl
//         });
    
// }
// async function goToPhoto(props) {
//     try{
//         const url = 'http://localhost:8000/img?';
//         const queryParams = 'path=';
//         const pathName = encodeURIComponent(props.photo.path) ;
//         const mimetype = encodeURIComponent(props.photo.mimetype);
//         const ampersand = "&";
//         const pathName2 = 'mimetype';
//         const endpoint = url+queryParams+pathName+ampersand+pathName2+mimetype;
//         const params = {
//             method: "GET"
//             };
        
//         var responseData = await fetch(endpoint, params).then(responseData => {
//             if (responseData.ok) {   
//                 console.log("Это лог из ф-кции goToPhoto1" + responseData) 
//                 // return responseData.json();
//                 return responseData.text();
//             }
//             throw new Error("ШОто пошло не так")

//         }).then(responseData =>{
            
//             var responseDataFinal = "data: image/png;base64, " + responseData;
//             return responseDataFinal;
//         })
//     }
//     catch(e){
//         console.log(e.message)
//     }
// }

// let logo = require(`../images/8fff6a649a4ea0d3fd3c2674606a4a2c`)

// let logo = require()

// async function renderImg(photos) {
//     console.log(photos)
//     // let photos = this.photo;
//     var man = new Image();
//     man.src = `./my-aploads/black-cat.jpg`;
    // return await document.getElementById('photoFrame').appendChild(man);
    // document.body.appendChild(man)

// }
export default Photos;
