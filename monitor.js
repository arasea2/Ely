import pm2 from 'pm2'
import os from 'os'

const appName = 'index.js'

setInterval(() => {
	const totalMemory = os.totalmem()
	const freeMemory = os.freemem()
	const usedMemoryInMB = (totalMemory - freeMemory) / (1024 * 1024)

	if (usedMemoryInMB <= 200) {
		console.log(`Restarting ${appName} due to low system memory usage`)
		pm2.connect(() => {
			pm2.restart(appName, (restartErr) => {
				pm2.disconnect()
				if (restartErr) {
					console.error(restartErr)
				}
			})
		})
	}
}, 10000)
