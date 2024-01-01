import http from 'http';
import Helper from './lib/helper.js';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { setupMaster, fork } from 'cluster';
import { watchFile, unwatchFile } from 'fs';
import { createInterface } from 'readline';


const rl = createInterface(process.stdin, process.stdout);
const __dirname = dirname(fileURLToPath(import.meta.url));
const args = [join(__dirname, 'main.js'), ...process.argv.slice(2)];

const PORT = process.env.PORT || 3000;

var isRunning = false;

function start(file) {
    if (isRunning) return;
    isRunning = true;
    setupMaster({
        exec: args[0],
        args: args.slice(1),
    });
    let p = fork();
    p.on('message', data => {
        console.log('[RECEIVED]', data);
        switch (data) {
            case 'reset':
                p.process.kill();
                isRunning = false;
                start.apply(this, arguments);
                break;
            case 'uptime':
                p.send(process.uptime());
                break;
        }
    });
    p.on('exit', (_, code) => {
        isRunning = false;
        console.error('Exited with code:', code);
        if (code === 0) return;
        watchFile(args[0], () => {
            unwatchFile(args[0]);
            start(file);
        });
    });
    if (!Helper.opts['test']) {
        if (!rl.listenerCount()) {
            rl.on('line', line => {
                p.emit('message', line.trim());
            });
        }
    }

    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Hello, World!</h1>');
      });
      
      server.listen(PORT, () => {
        console.log(`Server berjalan di http://localhost:${PORT}/`);
      });
}
start('main.js');
