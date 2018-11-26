import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { routerReducer } from "module";


let loginReducer = (state, action) => { //редьюсер для боля регистрации
    if (state === undefined) { //redux запускает редьюсер хотя бы раз, что бы инициализировать хранилище
        return { isLoggedIn: undefined, userName: 'Anonym' };  //обязательно вернуть новый объект, а не изменить текущий state
    }
    if (action.type === 'LOG_IN') { //в каждом action должен быть type
        return { isLoggedIn: true, userName: action.payload.name } //создаем новый объект базируясь на данных из предыдущего состояния
    }
    if (action.type === 'LOG_OUT') {
        return { isLoggedIn: false, userName: 'Anonym' }
    }
    return state; //редьюсеров может быть несколько, в таком случае вызываются все редьюсеры, но далеко не всегда action.type будет относится к этому редьюсеру. Тогда редьюсер должен вернуть state как есть. 
} 

let fetchStatusReducer = (state, action) => { 
    if (state === undefined) { //redux запускает редьюсер хотя бы раз, что бы инициализировать хранилище
        return { status: null, payload: null, error: null };  //обязательно вернуть новый объект, а не изменить текущий state
    }
    if (action.type === 'SET_STATUS') {
        return { status: action.status, payload: action.payload, error: action.error }
    }
    return state; //редьюсеров может быть несколько, в таком случае вызываются все редьюсеры, но далеко не всегда action.type будет относится к этому редьюсеру. Тогда редьюсер должен вернуть state как есть. 
}
let photosReducer = (state, action) => {
    if (state === undefined) { //redux запускает редьюсер хотя бы раз, что бы инициализировать хранилище
        return { status: null, payload: null, error: null };  //обязательно вернуть новый объект, а не изменить текущий state
    }
    if (action.type === 'SET_STATUS_PHOTO') {
        return { status: action.status, payload: action.payload, error: action.error }
    }
    return state; //редьюсеров может быть несколько, в таком случае вызываются все редьюсеры, но далеко не всегда action.type будет относится к этому редьюсеру. Тогда редьюсер должен вернуть state как есть. 
}



const reducers = combineReducers({ //создаем функцию-обертку, которая запустит последовательно counterReducer и booleanReducer передав им ветви c и b хранилища и обновив эти же ветви в случае нового состояния.
    loginState: loginReducer,
    fetchStatusState: fetchStatusReducer,
    fetchStatusPhotos: photosReducer
})



export let userStore = createStore(reducers, applyMiddleware(thunk))

//userStore.subscribe(() => console.log(userStore.getState()))
 // подписка на обновления store