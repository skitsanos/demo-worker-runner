Just an example of how to use worker_threads in Node.js



---



Adding array of workers to be executed:

```js
const rawTasks = Array.from({length: 10}, (_, id) => ({
    path: './downloadFile',
    workerData: {options: {id}, url: `url...#${id}`}
}));

for (const worker of rawTasks)
{
    WorkerRunner.add(worker);
}
```



Adding Async worker:

```js
WorkerRunner.add({
    path: './downloadFileAsync',
    workerData: {
        url: 'https://api.skitsanos.com/api/utils/headers'
    }
});
```



Tracking completion of the worker

```js
WorkerRunner.onTaskComplete = worker => console.log(worker);
```



Executing workers

```js
WorkerRunner.execute()
            .then(console.log);
```

