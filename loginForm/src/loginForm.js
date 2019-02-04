import React, { Component } from 'react'
import "./styles/login.css";
import { connect } from 'react-redux';
import {actionLogin, actionLogout} from './actionCreater';

class LoginForm extends Component {
    render() {
        const isLogDisabled = this.props.isLogDisabled;

        return (
            <div className="login-form">                
                <div>
                    <input placeholder='Login' className="login-data" ref={c => this.login = c}/><br />
                    <input type="password" placeholder='Password' ref={c => this.password = c}/>
                </div>
                <button onClick = {this.onLoginClick.bind(this)} disabled = {isLogDisabled}>Login</button>
                <button onClick = {this.onLogOutClick.bind(this)} disabled = {!isLogDisabled}>LogOut</button>
            </div>
        )
    }
    onLoginClick = () => {  
        this.props.actionLogin(this.login.value);
        
    }
    onLogOutClick = () => {
        this.props.actionLogout(this.login.value);

    }
}



export default connect(store => {

    return { isLogDisabled: store.loginState.isLoggedIn }
}, { actionLogin, actionLogout })(LoginForm);   //работаем заменой store.dispatch (1й парам, 
// ф-ция возвращающая ф-цию, которая примет значене в (LOginForm))