import cluster from 'cluster';
import os from 'os';
var http = require('http');
const numCpus = os.cpus().length;

// listening child process message event
function childMessage(msg) {
  console.log(arguments);
}
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }

  cluster.on('listening', function(worker, address) {
    console.log('listening: worker ' + worker.process.pid + ', Address: ' + address.address + ":" + address.port);
  });
  // for (const id in cluster.workers) {
  //  cluster.workers[id].on('message', childMessage);
  // }
  cluster.on('message', (worker, message, handle) => {
    console.log(message, worker.process.pid, handle);
  })

  // cluster.on('fork')

  // listening worker process exit event
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });

} else if (cluster.isWorker) {
  require('../database-manager/Article.js');
  // require('../crawl-manager/index.js');
  // process.send('123');
}
