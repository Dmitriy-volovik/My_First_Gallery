import React, { Component } from "react";
import { connect } from 'react-redux';
import "../styles/photos.css";
import { mapSTPPhoto, photosFetch } from "../actionCreater";

import { userStore } from './userState'
// import { photosFetch } from './actionCreater'


// class Photos extends Component{
//     render() {
//         console.log(this.props)
//         return(
//             <div className="main-div-ph">Tyt Mae bytu Fotku</div>
//         )
//     }
// }
class Photos extends Component {

    componentDidMount(){
        userStore.dispatch(photosFetch(this.props.match.params.id))
    }

    render() {
        console.log('photos', this.props.fetchStatusPhotos.status)
      
        console.log(this.props.fetchStatusPhotos)
        // const state = this.props.fetchStatusState;
        if (this.props.fetchStatusPhotos.status === "RESOLVED") {
            return (
                <div className="main-div-ph">
                    {this.props.fetchStatusPhotos.payload.map(photo => <Photo photo={photo} />)}
                </div>
            )
        }

        return <img src='https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' />
    }
}
Photos = connect(mapSTPPhoto)(Photos)

class Photo extends Component {
    render() {
        return (
            <div className="photo">
                <h1>
                    {this.props.photo.id}
                </h1>
                <p>
                    {this.props.photo.filename}
                </p>
            </div>
        )
    }
}
export default Photos;
