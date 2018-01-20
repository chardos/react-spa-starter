require('dotenv').config()
const s3 = require('s3');
const deleteContents = require('./delete');
const uploadContents = require('./upload');
const bucket = 'insertbucketnamehere';

const { S3_ACCESS_KEY, S3_PRIVATE_KEY } = process.env;

// Verify S3 Credentials
if (!S3_ACCESS_KEY) {
    console.error('missing S3_ACCESS_KEY');
    process.exit(1);
}
if (!S3_PRIVATE_KEY) {
    console.error('missing S3_PRIVATE_KEY');
    process.exit(1);
}

console.log('Using S3 Access Key:', S3_ACCESS_KEY);
console.log('Using S3 Private Key:', S3_PRIVATE_KEY);

const client = s3.createClient({
    maxAsyncS3: 20,
    s3RetryCount: 3,
    s3RetryDelay: 1000,
    multipartUploadThreshold: 20971520, // (20 MB)
    multipartUploadSize: 15728640, // (15 MB)
    s3Options: {
        accessKeyId: S3_ACCESS_KEY,
        secretAccessKey: S3_PRIVATE_KEY,
        region: 'ap-southeast-2',
    },
});

const uploadParams = {
    localDir: 'dist',
    deleteRemoved: true,
    s3Params: {
        Bucket: bucket,
        Prefix: '',
    },
};

const deleteParams = {
    Bucket: bucket,
    Prefix: '',
};

/**
 * We first delete the contents of the bucket because S3 seemed to be intermittently
 * not updating the files (seemed to be a caching issue).
 */
deleteContents(client, deleteParams)
    .then(() => uploadContents(client, uploadParams))
    .catch((err) => console.log(err))
