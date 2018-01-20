/* eslint-disable no-console */

module.exports = (client, params) => (
    new Promise((resolve, reject) => {
        const deleter = client.deleteDir(params);

        deleter.on('progress', () => {
            console.log('Deletion progress: ', deleter.progressAmount, deleter.progressTotal);
        });

        deleter.on('error', (err) => {
            reject(new Error(`unable to sync:' + ${err.stack}`));
        });

        deleter.on('end', () => {
            console.log('Deletion successful.');
            resolve()
        });
    })
);
