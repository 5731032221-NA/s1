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
    connectionString: 'DefaultEndpointsProtocol=https;AccountName=mystorageaccountname;AccountKey=wJalrXUtnFEMI/K7MDENG/bPxRfiCYzEXAMPLEKEY;EndpointSuffix=core.windows.net',
    accessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYzEXAMPLEKEY',
    accountName: 'mystorageaccountname',
    containerName: 'documents',
    blobName: resolveBlobName,
    metadata: resolveMetadata,
    containerAccessLevel: 'blob',
    urlExpirationTime: 60
});
 
const upload: multer.Instance = multer({
    storage: azureStorage
});
 
app.post('/documents', upload.any(), (req: Request, res: Response, next: NextFunction) => {
  console.log(req.files)
  res.status(200).json(req.files)
});