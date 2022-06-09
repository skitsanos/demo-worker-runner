const {
    Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

const {get} = require('got');

const downLoadFileAsync = (url, options) => new Promise(async resolve =>
{
    const {body} = await get(url, options);

    if (isMainThread)
    {
        resolve(body);
    }
    else
    {
        parentPort.postMessage(body);
    }
});

if (isMainThread)
{
    module.exports = downLoadFileAsync;
}
else
{
    const {url, options} = workerData;
    downLoadFileAsync(url, options);
}



