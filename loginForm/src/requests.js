import { GraphQLClient } from 'graphql-request'
import { photosFetch } from './actionCreater';

const gql = new GraphQLClient("http://localhost:8000/graphql", { headers: {} })

// const addPhotoQuery = async function(props) {
//     return await gql.request(`mutation createPhoto($id: Int, $originalname: String!, $encoding: String!,
//           $destination: String!, $filename: String!, $path: String!, $size: Int!) {
//                         createPhoto(id: $id, originalname: $originalname, encoding: $encoding,
//                            $destination: $destination, filename: $filename, path: $path, size: $size ) {
//                         }
//                             }
//                             `, { id: +props.id || null,
//                                  originalname: props.originalname,
//                                  destination: props.destination,
//                                  filename: props.filename,
//                                  path: props.path,
//                                  size: props.size,
//         }).then(data => console.log({ type: "DATA", data }))
// }

const addPhotoQuery = async function (props, albumID) {
  return await gql.request(`mutation createPhoto($albumID: Int, $originalname: String!, $mimetype: String!,
                            $destination: String!, $filename: String!, $path: String!, $size: Int!) {
                                createPhoto(albumID: $albumID, originalname: $originalname, mimetype: $mimetype, 
                                destination: $destination, filename: $filename,path: $path, size: $size) {
                                    albumID,
                                    originalname,
                                    mimetype,
                                    destination,
                                    filename,
                                    path,
                                    size,
                                }
                                    }
                                    `, {
      albumID: +albumID,
      originalname: props.originalname,
      mimetype: props.mimetype,
      destination: props.destination,
      filename: props.filename,
      path: props.path,
      size: props.size,
    }).then(data => console.log({ type: "DATA", data }))
}

const addAlbumQuery = async function(params) {
    console.log(params)
    return await gql.request(`mutation createAlbum($title: String!, $text: String!){
                         createAlbum(title: $title, text: $text){
                            title,
                            text,
                         }   
                    }` , {
     title: params.title,
     text: params.text,
   }).then(data => console.log({ type: "DATA", data }))
}


export { addPhotoQuery, addAlbumQuery}