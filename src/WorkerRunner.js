const {
    Worker
} = require('worker_threads');
const os = require('os');

const cpuCount = os.cpus().length;

const WorkerRunner = (() =>
{
    const threads = cpuCount === 1 ? 1 : cpuCount - 1;
    const workers = new Set();
    const workersToProcess = new Set();

    const workerMessages = [];

    const processWorkers = done =>
    {
        const availableThreads = threads - workersToProcess.size;
        if (workers.size === 0 && workersToProcess.size === 0)
        {
            done(workerMessages);
            return;
        }

        for (let i = 0; i < availableThreads; i++)
        {
            const worker = Array.from(workers).pop();
            //if no workers left, be gone
            if(!worker){
                return;
            }
            workers.delete(worker);

            const workerToRun = new Worker(worker.path, {workerData: worker.workerData});
            workersToProcess.add(workerToRun);

            workerToRun.on('message', msg =>
            {
                workerMessages.push(msg);
            });

            workerToRun.on('exit', code =>
            {
                workersToProcess.delete(workerToRun);

                if (code !== 0)
                {
                    throw new Error(`Worker stopped with exit code ${code}`);
                }

                processWorkers(done);
            });
        }
    };

    return {
        add(worker)
        {
            workers.add(worker);
        },

        execute()
        {
            return new Promise(resolve =>
            {
                processWorkers(data => resolve(data));
            });
        }
    };
})();

module.exports = WorkerRunner;