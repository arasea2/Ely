import { niceBytes } from '../../lib/func.js'
import { youtubedl } from '@bochilteam/scraper-sosmed'

let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!(args[0] || '').match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))) return m.reply(`Invalid Youtube URL.`)
	try {
		let anu = await youtubedl(args[0])
		let list = Object.keys(anu.video).toString()
		let data = anu.video[`${list.includes('36') ? '360p' : list.includes('24') ? '240p' : '144p'}`]
		let url = await data.download()
		if (data.fileSize > 400000) return m.reply(`Filesize: ${data.fileSizeH}\nTidak dapat mengirim, maksimal file 400 MB`)
		let txt = `*${anu.title}*\n\n`
			+ `⭔ Watch : ${args[0]}\n`
			+ `⭔ Resolution : ${data.quality}\n`
			+ `⭔ Size : ${data.fileSizeH}`
		await conn.sendFile(m.chat, url, `${anu.title}.mp4`, txt, m)
	} catch (e) {
		try {
			let anu = await (await fetch(`https://api.akuari.my.id/downloader/yt1?link=${args[0]}`)).json()
			let size = anu.urldl_video.size
			let vs = parseInt(size)
			if (isNaN(vs)) vs = 1
			if (vs > 400 && /mb|gb/i.test(size)) return m.reply(`Filesize: ${size}\nTidak dapat mengirim, maksimal file 400 MB`)
			let txt = `*${anu.info.title}*\n\n`
				+ `⭔ Watch : ${args[0]}\n`
				+ `⭔ Resolution : ${anu.urldl_video.quality}\n`
				+ `⭔ Size : ${size}`
			await conn.sendFile(m.chat, anu.urldl_video.link, `${anu.info.title}.mp4`, txt, m)
		} catch (e) {
			console.log(e)
			throw 'invalid url / internal server error.'
		}
	}
}

handler.menudownload = ['ytvideo <url>']
handler.tagsdownload = ['search']
handler.command = /^(yt(v(ideo)?|mp4))$/i

handler.premium = true
handler.limit = true

export default handler