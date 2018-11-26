import React, { Component } from "react";
import { connect } from 'react-redux';
import "../styles/albums.css";
import { mapStateToProps } from "../actionCreater";
import { Link } from 'react-router-dom';

class Albums extends Component {
    
    render() {
        if(this.props.fetchStatusState.status === "PENDING"){
            return (
             <img src='https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' />
            ) 
        }
        console.log(this.props.fetchStatusState)
        // const state = this.props.fetchStatusState;
        if(this.props.fetchStatusState.status === "RESOLVED"){
            return (
                <div className="main-div">
                    {this.props.fetchStatusState.payload.map(album =><Album album ={album}/>)}
                </div>
            )
        }

    }
}
Albums = connect(mapStateToProps)(Albums)

class Album extends Component{
    render() {
        return(
            <div className="album">   
                <h1>
                    {this.props.album.title}
                </h1>
                <p>
                    <Link to={`/albums/${this.props.album.id}`}>
                    {this.props.album.text}
                    </Link>
                </p>
            </div>
        )
    }
}
export default Albums;