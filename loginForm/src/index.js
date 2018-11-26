import React, { Component } from "react"
import { render } from "react-dom";
import LoginForm from "./loginForm";
import UserAvatar from "./components/userAvatar"

import { Provider } from 'react-redux'  //дает понять всем компонентам всех вложенностей, с каким Store(redux) работать
import { userStore } from './components/userState'
import {actionFetch} from './actionCreater'
import Photos from './components/photos'
import Albums from "./components/albums";

import { Router, Route, Link } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import Upload from "./components/routingPhoto";


// import { GraphQLClient } from 'graphql-request'
// const gql = new GraphQLClient("http://localhost:8000/graphql", { headers: {} })

// var a = async function () {
//     return await gql.request(`query getPhotos($id: Int!){
//                        getPhotos(id:$id){
//                              id
//                              text
//                            }
//                          }`, { id: 2 }).then(data => (console.log(data), data)).getPhotos
// }
// var b = data => (console.log(data), data);
// var c = "getPhotos";

userStore.dispatch(actionFetch())
class App extends Component {
    render() {
        return (
            
            <Provider store={userStore}>

                <Router history={createHistory()}>
                    <div>
                        <Route path="/albums/:id" component={Photos} />
                        <Route path="/" component={AppMain} exact />
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
                <LoginForm />
                <UserAvatar />
                <Albums />
                {/* <Photos /> */}
            </div>
        )
    }
}

render(<App />, document.getElementById('root'))