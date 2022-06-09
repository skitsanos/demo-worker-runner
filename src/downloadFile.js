const {
    isMainThread, parentPort, workerData
} = require('worker_threads');

const rnd = Math.ceil(Math.random() * 1000);

const downLoadFile = (url, options) =>
{
    setTimeout(() =>
    {
        if (isMainThread)
        {
            console.log('Downloaded', url);
        }
        else
        {
            parentPort.postMessage({url, options});
        }
    }, rnd);
};

if (isMainThread)
{
    module.exports = downLoadFile;
}
else
{
    const {url, options} = workerData;
    downLoadFile(url, options);
}



