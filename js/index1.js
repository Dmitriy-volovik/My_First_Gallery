const express = require('express')
const cors    = require('cors')
var multer = require('multer')


var Sequelize = require('sequelize');
var sequelize = new Sequelize('gallery', 'root', 'nokia',
    {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        //logging: false
    }
);
var Photo = sequelize.define('photo',{
    photo: Sequelize.STRING,
    name: Sequelize.STRING,
    originalname: Sequelize.STRING,
    // encoding: Sequelize.STRING,
    mimetype: Sequelize.STRING,
    destination: Sequelize.STRING,
    filename: Sequelize.STRING,
    path: Sequelize.STRING,
    size: Sequelize.INTEGER,

});
var Album = sequelize.define('album',{
    img: Sequelize.STRING,
    name: Sequelize.STRING,
    text: Sequelize.TEXT,
    title: Sequelize.STRING,

});
Album.hasMany(Photo)
Photo.belongsTo(Album)
// Album.hasOne(Cover)





sequelize.sync().then( () =>
console.log("DATA base test was created"));
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
var schema = buildSchema(`
    type Query {
        getAlbum(id: Int!): Album
        getPhotos(id: Int!): [Photo]
        getAlbums: [Album]
    }
    type Mutation {
        createAlbum(title: String!, text: String!): Album
        createPhoto(albumID: Int, originalname: String!, mimetype: String!,
             destination: String!, filename: String!, path: String!, size: Int!  ): Photo
    }
    type Album {
        id: Int
        img: String
        title: String
        text:  String
        age:   String
        photos: [Photo]
        timestamp: Int
        key: String
        }
    type Photo {
        id: Int
        albumID: Int
        text:  String
        tagz:  [String]
        originalname: String
        mimetype: String
        destination: String
        filename: String
        path: String
        size: Int
    }
`);
// async function getPhoto({name}){
//     return await Photo.findByName(name)
// }

async function getAlbum({id}){
   return await Album.findById(id)
}
// async function getAlmubByPhoto(){

// }
async function getAlbums(){

   return await Album.findAll();
}
async function getPhotos({id}){
    let album = await Album.findById(id)
    let photos = await album.getPhotos()
    return photos;
}
async function createAlbum({title, text}){
    return await Album.create({title, text})
}

async function createPhoto({ albumID, originalname, mimetype, destination, filename, path, size }){
    let photo = await Photo.create(
        {
            originalname: originalname,
            mimetype,
            destination,
            filename,
            path,
            size,
          })
    if (albumID) {
        let album = await Album.findById(albumID)
        album.addPhoto(photo)
    } 
    return photo
}

var root = {
    createAlbum,
    createPhoto,
    getAlbum,
    getPhotos,
    getAlbums,
};


var app = express();
app.use(cors())

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.use(express.static('upload'))

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './my-uploads')
    },
    // filename: function (req, file, cb) {
    //     cb(null, file.fieldname + '-' + Date.now())
    // }
})
var upload = multer({ storage: storage })
// var upload = multer({ dest: 'upload' })

app.post("/upload", upload.array('file', 50), (req, res) => {
    console.log(req.files)
    res.status(200).send(req.files);
    res.end();
})
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
// router.post("/upload", upload.single('theFile'), (req, res) => {
//     debug(req.file.buffer);
//     res.status(200).send(true);
//     res.end();
// });

app.listen(8000)