import db from '../../lib/database.js'
import { readMore, ranNumb, padLead } from '../../lib/func.js'
import { plugins } from '../../lib/plugins.js'
import { promises } from 'fs'
import { join } from 'path'
import fs from 'fs'

let tagstoram = {
	'toram': 'TORAM',
}
const defaultMenu = {
	before: `
━ ━ *[ 🎮Toram Online ]* ━ ━
`.trimStart(),
	header: '╭─「 %category 」',
	body: '│ • %cmd',
	footer: '╰────\n',
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
	try {
		let nais = await (await fetch('https://raw.githubusercontent.com/clicknetcafe/Databasee/main/azamibot/menus.json')).json().then(v => v.getRandom())
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let menutoram = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				menutoram: Array.isArray(plugin.tagstoram) ? plugin.menutoram : [plugin.menutoram],
				tagstoram: Array.isArray(plugin.tagstoram) ? plugin.tagstoram : [plugin.tagstoram],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of menutoram)
			if (plugin && 'tagstoram' in plugin)
				for (let tag of plugin.tagstoram)
					if (!(tag in tagstoram) && tag) tagstoram[tag] = tag
		conn.menutoram = conn.menutoram ? conn.menutoram : {}
		let before = conn.menutoram.before || defaultMenu.before
		let header = conn.menutoram.header || defaultMenu.header
		let body = conn.menutoram.body || defaultMenu.body
		let footer = conn.menutoram.footer || defaultMenu.footer
		let _text = [
			before,
			...Object.keys(tagstoram).map(tag => {
				return header.replace(/%category/g, tagstoram[tag]) + '\n' + [
					...menutoram.filter(menutoram => menutoram.tagstoram && menutoram.tagstoram.includes(tag) && menutoram.menutoram).map(menutoram => {
						return menutoram.menutoram.map(menutoram => {
							return body.replace(/%cmd/g, menutoram.prefix ? menutoram : '%p' + menutoram)
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			})
		].join('\n')
		let text = typeof conn.menutoram == 'string' ? conn.menutoram : typeof conn.menutoram == 'object' ? _text : ''
		let replace = {
			p: _p,
			'%': '%',
			readmore: readMore
		}
		text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
		const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
		await conn.sendFThumb(m.chat, db.data.datas.maingroupname, text.replace(`message <text>`, `message <text>${readMore}`).trim(), nais, db.data.datas.linkgc, m)
	} catch (e) {
		console.log(e)
	}
}

handler.help = ['menutoram']
handler.tags = ['submenu']
handler.command = /^(tor?amm(enu)?|m(enu)?tor?am)$/i

export default handler