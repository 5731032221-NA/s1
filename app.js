const multer = require('multer')
const MulterAzureStorage = require('multer-azure-blob-storage').MulterAzureStorage;

const resolveBlobName: MASNameResolver = (req: any, file: Express.Multer.File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const blobName: string = yourCustomLogic(req, file);
        resolve(blobName);
    });
};
 
export type MetadataObj = { [k: string]: string };
const resolveMetadata: MASObjectResolver = (req: any, file: Express.Multer.File): Promise<MetadataObj> => {
    return new Promise<MetadataObj>((resolve, reject) => {
        const metadata: MetadataObj = yourCustomLogic(req, file);
        resolve(metadata);
    });
};
 
const azureStorage: MulterAzureStorage = new MulterAzureStorage({
    connectionString: 'DefaultEndpointsProtocol=https;AccountName=oneteamblob;AccountKey=qcv7bSwg5vFNZRt1gY9XLPcv6OWKdKakKCj5znpUQRNQTPAOkLbhnCuZpt/1m4Gc9f5tV55x0CEzcVWjCubTaQ==;EndpointSuffix=core.windows.net'
    accessKey: 'qcv7bSwg5vFNZRt1gY9XLPcv6OWKdKakKCj5znpUQRNQTPAOkLbhnCuZpt/1m4Gc9f5tV55x0CEzcVWjCubTaQ==',
    accountName: 'oneteamblob',
    containerName: 'profilepicture',
    blobName: resolveBlobName,
    metadata: resolveMetadata,
    containerAccessLevel: 'blob',
    urlExpirationTime: 60
});
 
const upload: multer.Instance = multer({
    storage: azureStorage
});
 
app.post('/upload', upload.any(), (req: Request, res: Response, next: NextFunction) => {
  console.log(req.files)
  res.status(200).json(req.files)
});