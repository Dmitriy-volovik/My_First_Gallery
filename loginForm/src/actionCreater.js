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

// Для получения нескольких фото на обложку альбома
const actionPendPh = (albumId) => ({ type: 'SET_STATUS_PHOTO_COVER', status: 'PENDING', payload: null, error: null, albumId })
const actionResolPh = (albumId, payload) => ({ type: 'SET_STATUS_PHOTO_COVER', status: 'RESOLVED', payload, error: null, albumId })
const actionRejectdPh = (albumId, error) => ({ type: 'SET_STATUS_PHOTO_COVER', status: 'REJECTED', payload: null, error, albumId })

let mapStateToProps = state => ({ fetchStatusState: state.fetchStatusState})
let mapSTPPhoto = state => ({fetchStatusPhotos: state.fetchStatusPhotos})
let mapStateTPCover = state => ({ fetchStatusForCover: state.showPhotoOnAlbCover})
// let delay = (ms => (new Promise(r => setTimeout(r, ms))))

// Запрос на первоначальную загрузку альбомов на странице
 export function actionFetch() {      
    return async function (dispatch) {
        dispatch(actionPending())
        // await delay(1000)
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
        // await delay(1000)
        try {
            dispatch(actionResolvedPh((await gql.request(`query getPhotos($id: Int!) {
                        getPhotos(id:$id) {
                            id,
                            filename,
                            mimetype,
                            path
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
   
export function showPhotoFromAlbum(id, limit) {
    return async function (dispatch) {
        dispatch(actionPendPh(id))
        try {
            dispatch(actionResolPh(id, (await gql.request(`query getPhotosToAlbum($id: Int!, $limit: Int!) {
                        getPhotosToAlbum(id:$id, limit: $limit) {
                            id,
                            filename,
                            path,                  
                        }
                            }
                            `, {
                    id: +id,
                    limit: limit,
                }).then(data => data)).getPhotosToAlbum
            ))
        }
        catch (e) {
            dispatch(actionRejectdPh(id, e))
        }
    }
}
export function DeletePhotoQuery(id,albumId) {
    return async function (dispatch) {
       
        await gql.request(`mutation deletePhoto($id: Int!){
                        deletePhoto(id: $id){
                            id
                        }
    }`, {
                id: +id,
            })

        dispatch(photosFetch(albumId))
    }
} 

let actionLogin = (login, password) => ({ type: 'LOG_IN', payload: { name: login } }) //ф-ция, создающая экшены.
let actionLogout = () => ({ type: 'LOG_OUT' })
let actionAddAlbum = (title, text) => ({ type: 'ADD_ALBUM', payload: { name: title, description: text} }) //пока не юзается

export { actionLogin, actionLogout, actionAddAlbum, mapStateToProps, mapSTPPhoto, mapStateTPCover}




