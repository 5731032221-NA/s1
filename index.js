//const express = require('express')
//const path = require('path')
//const PORT = process.env.PORT || 5000
//const app = require('express');

//const multer = require('multer')
//const MulterAzureStorage = require('multer-azure-blob-storage').MulterAzureStorage;
var multer = require('multer')
var multerAzure = require('multer-azure')
// Expose the /upload endpoint
const app = require('express')();
//const http = require('http').Server(app);

// app.post('/upload', upload.single('photo'), (req, res, next) => {
  // res.json(req.file)
// })

let port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// app.listen(PORT, function () {
    // console.log('app listening on port '+PORT+'!');
// })

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
    // extended: true
// }));

// express()
  // .use(express.static(path.join(__dirname, 'public')))
  // .set('views', path.join(__dirname, 'views'))
  // .set('view engine', 'ejs')
  // .get('/', (req, res) => res.render('pages/index'))
  // .listen(PORT, () => console.log(`Listening on ${ PORT }`))

// const resolveBlobName = (req, file) => {
    // return new Promise((resolve, reject) => {
        // const blobName = yourCustomLogic(req, file);
        // resolve(blobName);
    // });
// };
 
// const resolveMetadata = (req, file) => {
    // return new Promise((resolve, reject) => {
        // const metadata = yourCustomLogic(req, file);
        // resolve(metadata);
    // });
// };
 
// const azureStorage = new MulterAzureStorage({
    // connectionString: 'DefaultEndpointsProtocol=https;AccountName=oneteamblob;AccountKey=qcv7bSwg5vFNZRt1gY9XLPcv6OWKdKakKCj5znpUQRNQTPAOkLbhnCuZpt/1m4Gc9f5tV55x0CEzcVWjCubTaQ==;EndpointSuffix=core.windows.net',
    // accessKey: 'qcv7bSwg5vFNZRt1gY9XLPcv6OWKdKakKCj5znpUQRNQTPAOkLbhnCuZpt/1m4Gc9f5tV55x0CEzcVWjCubTaQ==',
    // accountName: 'oneteamblob',
    // containerName: 'profilepicture',
    // blobName: resolveBlobName,
    // metadata: resolveMetadata,
    // containerAccessLevel: 'blob',
    // urlExpirationTime: 60
// });
var blobPath = 'name';

var upload = multer({ 
  storage: multerAzure({
    connectionString: 'DefaultEndpointsProtocol=https;AccountName=oneteamblob;AccountKey=qcv7bSwg5vFNZRt1gY9XLPcv6OWKdKakKCj5znpUQRNQTPAOkLbhnCuZpt/1m4Gc9f5tV55x0CEzcVWjCubTaQ==;EndpointSuffix=core.windows.net', //Connection String for azure storage account, this one is prefered if you specified, fallback to account and key if not.
    account: 'oneteamblob', //The name of the Azure storage account
    key: 'qcv7bSwg5vFNZRt1gY9XLPcv6OWKdKakKCj5znpUQRNQTPAOkLbhnCuZpt/1m4Gc9f5tV55x0CEzcVWjCubTaQ==', //A key listed under Access keys in the storage account pane
    container: 'profilepicture',  //Any container name, it will be created if it doesn't exist
    blobPathResolver: function(req, file, callback){
      blobPath = Date.now().toString() + '.png'; //Calculate blobPath in your own way.
      callback(null, blobPath);
    }
  })
})
 
app.post('/upload', upload.any(), function (req, res, next) {
  console.log(req.files)
  res.status(200).send(blobPath)
})
 
// const upload = multer({
    // storage: azureStorage
// });
 
// app.post('/upload', upload.single('photo'), (req, res, next) => {
  // console.log(req.files)
  // res.status(200).json(req.files)
// });

app.get('/',  function (req, res) {
  res.send('Hello Heroo')
})
