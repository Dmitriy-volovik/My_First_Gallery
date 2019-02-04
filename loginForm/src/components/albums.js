import React, { Component } from "react";
import { connect } from 'react-redux';
import "../styles/albums.css";
import { mapStateToProps } from "../actionCreater";
import { Link } from 'react-router-dom';
import CreateAlbum from './createAlbum'
import executeSlider from "../sliderPhotoForAlbum";
import { mapStateTPCover, showPhotoFromAlbum } from "../actionCreater";

// const properties = {
//     duration: 5000,
//     transitionDuration: 500,
//     infinite: true,
//     indicators: true,
//     arrows: true
// }

class Albums extends Component {
    
    render() {
        if(this.props.fetchStatusState.status === "PENDING"){
            return (
             <img src='https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' />
            ) 
        }
        if(this.props.fetchStatusState.status === "RESOLVED"){
            return (
                <div className="wrapper-for-grid-albums">
                        {this.props.fetchStatusState.payload.map(album => <Album album={album} />)}
                    <div className="div-add-album">
                        <CreateAlbum />
                    </div>
                    
                </div>
            )
        }

    }
}
Albums = connect(mapStateToProps)(Albums)

class Album extends Component{

     checkForPhotoArray(){
        if (this.props.fetchStatusForCover.albums && this.props.fetchStatusForCover.albums["status"] === "RESOLVED" &&
            this.props.fetchStatusForCover.albums[this.props.album.id] && this.props.fetchStatusForCover.albums[this.props.album.id][0]) {
                this.setState({
                    img: `http://localhost:8000/${this.props.fetchStatusForCover.albums[this.props.album.id][0].filename}`
                })
            } else{
                this.setState({
                    img:'/images/image-not-found.png'
                })
            }
    }

    state = {
        img: '/images/loadingAlbums.gif',
        photoIndex: 0,
        timerId: 0,
    }


    componentWillMount(){
        this.props.showPhotoFromAlbum(this.props.album.id, 7).then(() =>{
            this.checkForPhotoArray()
        });
    }
    render() {
        // let photoArrayForAlbum;
        let albumID = this.props.album.id;
        return( 
            <div className="album item1" >
                <div className="content-in-album">                    
                    <p className="album-description">
                        <Link to={`/albums/${this.props.album.id}`} style={{ color: "white" }} >
                            {this.props.album.text}
                            <img
                                src={this.state.img}
                                alt="Nety scrola krivorykij"
                                width="100%"
                                max-width="100%"
                                // heigh="100%"
                                onMouseEnter={() => {
                                    if (this.props.fetchStatusForCover.albums[this.props.album.id][0]){
                                        executeSlider(this, albumID)
                                    }
                                }}
                                onMouseOut={() => {
                                    this.setState({
                                        timerId: clearInterval(this.state.timerId)
                                    })
                                }}
                            />

                        </Link>
                    </p>
                </div>
             </div>
        )
    }

}

Album = connect(mapStateTPCover, { showPhotoFromAlbum})(Album)
export default Albums;