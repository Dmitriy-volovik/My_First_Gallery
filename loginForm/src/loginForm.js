import React, { Component } from 'react'
import "./styles/login.css";
//import { userStore } from "./components/userState";
import { connect } from 'react-redux';
import {actionLogin, actionLogout} from './actionCreater';

// class LoginFields extends Component {

//     render() {
//         return (
//             <div>
//                 <input placeholder='Login' className="login-data" /><br />
//                 <input type="password" placeholder='Password' />
//             </div>
//         )
//     }
// }




class LoginForm extends Component {
    render() {
        //const isLogDisabled = userStore.getState().isLoggedIn
        const isLogDisabled = this.props.isLogDisabled;

        console.log(this.props)
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
        console.log(`this.login.value - ${this.login.value}`);
     /*   userStore.dispatch({
            type: "LOG_IN",
            payload: {name: data}
        }) */
        //this.setState(userStore.getState()) 
    }
    onLogOutClick = () => {
        this.props.actionLogout(this.login.value);
        // userStore.dispatch({
        //     type:"LOG_OUT"
        // })
        // this.setState(userStore.getState()) 
    }
}



export default connect(store => {
    console.log(store)
    return { isLogDisabled: store.loginState.isLoggedIn }
}, { actionLogin, actionLogout })(LoginForm);   //работаем заменой store.dispatch (1й парам, 
// ф-ция возвращающая ф-цию, которая примет значене в (LOginForm))