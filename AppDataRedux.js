import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {Provider, connect }   from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

let store = createStore((state, action) => { //единственный редьюсер данного хранилища
    if (state === undefined){ //redux запускает редьюсер хотя бы раз, что бы инициализировать хранилище
        return {status: null, payload: null, error: null};  //обязательно вернуть новый объект, а не изменить текущий state
    }
    if (action.type === 'SET_STATUS'){
        return {status: action.status, payload: action.payload, error: action.error}
    }
    return state; //редьюсеров может быть несколько, в таком случае вызываются все редьюсеры, но далеко не всегда action.type будет относится к этому редьюсеру. Тогда редьюсер должен вернуть state как есть. 
},applyMiddleware(thunk))

store.subscribe(() => console.log(store.getState()))

const actionPending     = () => ({ type: 'SET_STATUS', status: 'PENDING', payload: null, error: null })
const actionResolved    = payload => ({ type: 'SET_STATUS', status: 'RESOLVED', payload, error: null })
const actionRejected    = error => ({ type: 'SET_STATUS', status: 'REJECTED', payload: null, error })

let delay = (ms => (new Promise(r => setTimeout(r, ms))))

function actionFetch(){
    return async function (dispatch){
        dispatch(actionPending())
        await delay(1000)
        try {
            let response = await fetch('https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json')
            let data     = await response.json()
            dispatch(actionResolved(data))
        }
        catch (e) {
            dispatch(actionRejected(e))
        }
    }
}

store.dispatch(actionFetch())

let Status = p =>
<div>
    {p.status === 'PENDING' && <img src='https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' />}
    {p.status === 'RESOLVED' && <div>{Object.keys(p.payload).map(country => <div>{country}</div>)}</div>}
    {p.status === 'REJECTED' && <div style={{backgroundColor: '#FAA'}}>{p.error.message}</div>}
</div>

Status = connect(s => s)(Status)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <div className="App">
            <Status/>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
        </Provider>
    );
  }
}

export default App;
