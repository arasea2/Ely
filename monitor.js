import pm2 from 'pm2'
const appName = 'index.js';
const memoryThreshold = 200; // Batas memori dalam megabyte

function restartApp() {
	pm2.restart(appName, (restartErr) => {
		if (restartErr) {
			console.error(restartErr);
		}
	});
}
pm2.connect(() => {
	pm2.launchBus((err, bus) => {
		bus.on('process:event', (packet) => {
			if (packet.process.name === appName && packet.event === 'exit') {
				console.error(`${appName} exited unexpectedly. Restarting...`);
				restartApp();
			}
		});
	});
})

setInterval(() => {
	pm2.describe(appName, (descErr, description) => {
		if (!descErr && description[0]) {
			const memoryUsage = description[0].monit.memory / (1024 * 1024); // Memori dalam megabyte
			if (memoryUsage < memoryThreshold) {
				console.error(`Memory usage below ${memoryThreshold} MB. Restarting...`);
				restartApp();
			}
		}
	});
}, 60000)