/* eslint-disable no-console */

module.exports = (client, params) => (
    new Promise((resolve, reject) => {
        const uploader = client.uploadDir(params);

        uploader.on('progress', () => {
            console.log('Upload progress: ', uploader.progressAmount, uploader.progressTotal);
        });

        uploader.on('error', (err) => {
            reject(new Error(`unable to sync:' + ${err.stack}`));
        });

        uploader.on('end', () => {
            console.log('Upload successful.');
            resolve()
        });
    })
);
