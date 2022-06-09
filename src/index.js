const WorkerRunner = require('./WorkerRunner');

const downloadFile = require('./downloadFile');

console.log('Calling download file, the old way');
downloadFile('oldway.file', {id: -999});


console.log('Downloading threaded')
const rawTasks = Array.from({length: 10}, (_, id) => ({
    path: './downloadFile',
    workerData: {options: {id}, url: `url...#${id}`}
}));

for (const worker of rawTasks)
{
    WorkerRunner.add(worker);
}

WorkerRunner.execute()
            .then(console.log);



