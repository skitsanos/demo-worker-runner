const WorkerRunner = require('./WorkerRunner');

const downloadFile = require('./downloadFile');
const downloadFileAsync = require('./downloadFileAsync');

console.log('Calling download file, the old way');
downloadFile('oldway.file', {id: -999});

//downloadFileAsync('https://api.skitsanos.com/api/utils/headers').then(console.log);

console.log('Downloading threaded');
const rawTasks = Array.from({length: 10}, (_, id) => ({
    path: './downloadFile',
    workerData: {options: {id}, url: `url...#${id}`}
}));

for (const worker of rawTasks)
{
    WorkerRunner.add(worker);
}

WorkerRunner.add({
    path: './downloadFileAsync',
    workerData: {
        url: 'https://api.skitsanos.com/api/utils/headers'
    }
});

WorkerRunner.onTaskComplete = worker => console.log(worker);

WorkerRunner.execute()
            .then(console.log);



