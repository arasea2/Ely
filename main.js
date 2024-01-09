process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
process.on('uncaughtException', console.error)

import './config.js'
import cfonts from 'cfonts'
import Connection from './lib/connection.js'
import Helper from './lib/helper.js'
import db from './lib/database.js'
import clearTmp from './lib/clearTmp.js'
import clearSessions from './lib/clearSessions.js'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
import { spawn } from 'child_process'
import { protoType, serialize } from './lib/simple.js'
import {
	plugins,
	loadPluginFiles,
	reload,
	pluginFolder,
	pluginFilter
} from './lib/plugins.js'
import pm2 from 'pm2'
import os from 'os'


const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname) // Bring in the ability to create the 'require' method
const args = [join(__dirname, 'main.js'), ...process.argv.slice(2)]
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000
const { say } = cfonts
const { name, author } = require(join(__dirname, './package.json')) // https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/

say('Lightweight\nWhatsApp Bot', {
	font: 'chrome',
	align: 'center',
	gradient: ['red', 'magenta']
})
say(`'${name}' By @${author.name || author}`, {
	font: 'console',
	align: 'center',
	gradient: ['red', 'magenta']
})

say([process.argv[0], ...args].join(' '), {
	font: 'console',
	align: 'center',
	gradient: ['red', 'magenta']
})

protoType()
serialize()

// Assign all the value in the Helper to global
Object.assign(global, {
	...Helper,
	timestamp: {
		start: Date.now()
	}
})

// global.opts['db'] = process.env['db']

/** @type {import('./lib/connection.js').Socket} */
const conn = Object.defineProperty(Connection, 'conn', {
	value: await Connection.conn,
	enumerable: true,
	configurable: true,
	writable: true
}).conn

// load plugins
loadPluginFiles(pluginFolder, pluginFilter, {
	logger: conn.logger,
	recursiveRead: true
}).then(_ => console.log(Object.keys(plugins)))
	.catch(console.error)


if (!opts['test']) {
	setInterval(async () => {
		await Promise.allSettled([
			db.data ? db.write() : Promise.reject('db.data is null'),
			(opts['autocleartmp'] || opts['cleartmp']) ? clearTmp() : Promise.resolve(),
			(opts['autoclearsessions'] || opts['clearsessions']) ? clearSessions() : Promise.resolve()
			//clearTmp()
		])
		Connection.store.writeToFile(Connection.storeFile)
	}, 1000 * 60 * 5) // save every 5 minute
}
if (opts['server']) (await import('./server.js')).default(conn, PORT)


// Quick Test
async function _quickTest() {
	let test = await Promise.all([
		spawn('ffmpeg'),
		spawn('ffprobe'),
		spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
		spawn('convert'),
		spawn('magick'),
		spawn('gm'),
		spawn('find', ['--version'])
	].map(p => {
		return Promise.race([
			new Promise(resolve => {
				p.on('close', code => {
					resolve(code !== 127)
				})
			}),
			new Promise(resolve => {
				p.on('error', _ => resolve(false))
			})
		])
	}))
	let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
	console.log(test)
	let s = global.support = {
		ffmpeg,
		ffprobe,
		ffmpegWebp,
		convert,
		magick,
		gm,
		find
	}
	// require('./lib/sticker').support = s
	Object.freeze(global.support)

	if (!s.ffmpeg) (conn?.logger || console).warn('Please install ffmpeg for sending videos (pkg install ffmpeg)')
	if (s.ffmpeg && !s.ffmpegWebp) (conn?.logger || console).warn('Stickers may not animated without libwebp on ffmpeg (--enable-libwebp while compiling ffmpeg)')
	if (!s.convert && !s.magick && !s.gm) (conn?.logger || console).warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)')
}

_quickTest()
	.then(() => (conn?.logger?.info || console.log)('Quick Test Done'))
	.catch(console.error)

console.log((os.totalmem - os.freemem) / (1023 / 1024))

// const appName = 'index.js'

//setInterval(() => {
//	const totalMemory = os.totalmem()
//	const freeMemory = os.freemem()
//	const usedMemoryInMB = (totalMemory - freeMemory) / (1024 * 1024)

//	if (usedMemoryInMB <= 200) {
//		console.log(`Restarting ${appName} due to low system memory usage`)
//		pm2.connect(() => {
//			pm2.restart(appName, (restartErr) => {
//				pm2.disconnect()
//				if (restartErr) {
//					console.error(restartErr)
//				}
//			})
//		})
//	}
//}, 100)

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
}, 60000); // Memeriksa setiap 30 detik
