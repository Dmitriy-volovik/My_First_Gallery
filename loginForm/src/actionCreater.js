import React, { Component } from 'react'
import { GraphQLClient } from 'graphql-request'

const gql = new GraphQLClient("http://localhost:8000/graphql", { headers: {} })

// gql.request(`query getPhotos($id: Int!){
//                       getPhotos(id:$id){
//                             id
//                             text
//                           }
//                         }`, { id: 2 })
//     .then(data => console.log({ type: "DATA", data }))



// криэйторы для формы логина
const actionPending = () => ({ type: 'SET_STATUS', status: 'PENDING', payload: null, error: null })
const actionResolved = payload => ({ type: 'SET_STATUS', status: 'RESOLVED', payload, error: null })
const actionRejected = error => ({ type: 'SET_STATUS', status: 'REJECTED', payload: null, error })

// для загрузки альбомов
const actionPendingPh = () => ({ type: 'SET_STATUS_PHOTO', status: 'PENDING', payload: null, error: null })
const actionResolvedPh = payload => ({ type: 'SET_STATUS_PHOTO', status: 'RESOLVED', payload, error: null })
const actionRejectedPh = error => ({ type: 'SET_STATUS_PHOTO', status: 'REJECTED', payload: null, error })

// для добавления фото в альбом
// const actionPendingPhAdd = () => ({ type: 'SET_STATUS_PHOTO', status: 'PENDING', payload: null, error: null })
// const actionResolvedPhAdd = payload => ({ type: 'SET_STATUS_PHOTO', status: 'RESOLVED', payload, error: null })
// const actionRejectedPhAdd = error => ({ type: 'SET_STATUS_PHOTO', status: 'REJECTED', payload: null, error })

let mapStateToProps = state => ({ fetchStatusState: state.fetchStatusState})
let mapSTPPhoto = state => ({fetchStatusPhotos: state.fetchStatusPhotos})

let delay = (ms => (new Promise(r => setTimeout(r, ms))))

// Запрос на первоначальную загрузку альбомов на странице
 export function actionFetch() {      
    return async function (dispatch) {
        dispatch(actionPending())
        await delay(1000)
        try {
            dispatch(actionResolved((await gql.request(`query getAlbums {
                        getAlbums {
                            id, title, text
                        }
                            }
                            `).then(data => (console.log(data), data))).getAlbums
            ))
        }
        catch (e) {
            dispatch(actionRejected(e))
        }
    }
}


// запрос на выгрузку фото из альбома
export function photosFetch(id) {
    return async function (dispatch) {
        dispatch(actionPendingPh())
        await delay(1000)
        try {
            dispatch(actionResolvedPh((await gql.request(`query getPhotos($id: Int!) {
                        getPhotos(id:$id) {
                            id,
                            filename,
                        }
                            }
                            `, { id: +id }).then(data => (console.log({ type: "DATA", data }), data))).getPhotos
            ))
        }
        catch (e) {
            dispatch(actionRejectedPh(e))
        }
    }
}
   

// запрос на добавление инфо о фото в таблицу
// export function photosLoadToTable(id) {
//     return async function (dispatch) {
//         dispatch(actionPendingPhAdd())
//         await delay(1000)
//         try {
//             dispatch(actionResolvedPhAdd((await gql.request(`query getPhotos($id: Int!) {
//                         getPhotos(id:$id) {
//                             id,
//                             text
//                         }
//                             }
//                             `, { id: +id }).then(data => (console.log({ type: "DATA", data }), data))).getPhotos
//             ))
//         }
//         catch (e) {
//             dispatch(actionRejectedPhAdd(e))
//         }
//     }
// }

// Status = connect(s => s)(Status)
let actionLogin = (login, password) => ({ type: 'LOG_IN', payload: { name: login } }) //ф-ция, созающая экшены.
let actionLogout = () => ({ type: 'LOG_OUT' })

export { actionLogin, actionLogout, mapStateToProps, mapSTPPhoto}




