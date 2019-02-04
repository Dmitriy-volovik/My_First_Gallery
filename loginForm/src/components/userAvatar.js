import React, { Component } from "react"
import "../styles/avatar.css";
import {connect} from 'react-redux';

class UserAvatar extends Component{

    render(){
        return(
            <div className="user-avatar">
                <a href="#">{this.props.userNameLog}</a>
            </div>
        )
    }
}
export default connect(s => ({ userNameLog: s.loginState.userName}))(UserAvatar)