import { parentPort } from 'worker_threads';

parentPort.on('message', (data) => {
    
    console.log(`Received data from main thread: ${data}`);
    
    
    parentPort.postMessage(`Hello from worker thread!`);
});
