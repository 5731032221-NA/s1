//const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = require('express');

const multer = require('multer')
const MulterAzureStorage = require('multer-azure-blob-storage').MulterAzureStorage;

app.listen(PORT, function () {
    console.log('app listening on port '+PORT+'!');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// express()
  // .use(express.static(path.join(__dirname, 'public')))
  // .set('views', path.join(__dirname, 'views'))
  // .set('view engine', 'ejs')
  // .get('/', (req, res) => res.render('pages/index'))
  // .listen(PORT, () => console.log(`Listening on ${ PORT }`))

const resolveBlobName = (req, file) => {
    return new Promise((resolve, reject) => {
        const blobName = yourCustomLogic(req, file);
        resolve(blobName);
    });
};
 
const resolveMetadata = (req, file) => {
    return new Promise((resolve, reject) => {
        const metadata = yourCustomLogic(req, file);
        resolve(metadata);
    });
};
 
const azureStorage = new MulterAzureStorage({
    connectionString: 'DefaultEndpointsProtocol=https;AccountName=oneteamblob;AccountKey=qcv7bSwg5vFNZRt1gY9XLPcv6OWKdKakKCj5znpUQRNQTPAOkLbhnCuZpt/1m4Gc9f5tV55x0CEzcVWjCubTaQ==;EndpointSuffix=core.windows.net'
    accessKey: 'qcv7bSwg5vFNZRt1gY9XLPcv6OWKdKakKCj5znpUQRNQTPAOkLbhnCuZpt/1m4Gc9f5tV55x0CEzcVWjCubTaQ==',
    accountName: 'oneteamblob',
    containerName: 'profilepicture',
    blobName: resolveBlobName,
    metadata: resolveMetadata,
    containerAccessLevel: 'blob',
    urlExpirationTime: 60
});
 
const upload = multer({
    storage: azureStorage
});
 
app.post('/documents', upload.any(), (req, res, next) => {
  console.log(req.files)
  res.status(200).json(req.files)
});

app.get('/',  function (req, res) {
  res.send('Hello Heroo')
})
