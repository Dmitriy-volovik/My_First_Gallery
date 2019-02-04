import React, { Component } from "react"
import { render } from "react-dom";
import UserAvatar from "./components/userAvatar"
import { Provider } from 'react-redux'  //дает понять всем компонентам всех вложенностей, с каким Store(redux) работать
import { userStore } from './components/userState'
import {actionFetch} from './actionCreater'
import Photos from './components/photos'
import Albums from "./components/albums";
import BigImages from './components/bigImages'

import { Router, Route, Link } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import Upload from "./components/routingPhoto";

import FullScreen from "./components/test"
import ModalLoginForm from "./components/modalLoginForm";
import './styles/mainAppComponent.css'


userStore.dispatch(actionFetch())
class App extends Component {

    render() {
        
        return (
            
            <Provider store={userStore}>

                <Router history={createHistory()}>
                    <div className="background-for-all-pages">
                        <Route path="/albums/:id" component={Photos} />
                        <Route path="/" component={AppMain} exact />
                        <Route path="/addAl" component={FullScreen} />
                        <Route path="/upload" component={Upload} />
                    </div>
                </Router>

            </Provider>
        );
    }

}
class AppMain extends Component{
    render() {
        return(
            <div className="App">
                <ModalLoginForm/>
                <UserAvatar />
                <BigImages />
                <Albums />
            </div>
        )
    }
}
render(<App />, document.getElementById('root'))