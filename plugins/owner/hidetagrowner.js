let handler = async (m, { conn, text, usedPrefix, command, participants }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	text = text ? text : m.quoted?.text ? m.quoted.text : m.quoted?.caption ? m.quoted.caption : m.quoted?.description ? m.quoted.description : ''
	if (!text) throw `Example : ${usedPrefix + command} ayo mabar`
	if (/video|image/g.test(mime) && !/webp/g.test(mime)) {
		let media = await q.download?.()
		await conn.sendFile(m.chat, media, '', text, null, false, { mentions: participants.map(a => a.id), quoted: fkontak })
	} else await conn.reply(m.chat, text, fkontak, { mentions: participants.map(a => a.id) })
}

handler.menuowner = ['hidetag'].map(v => v + ' <teks>')
handler.tagsowner = ['ownerr']
handler.command = /^(ohidetag)$/i

handler.rowner = true
handler.group = true

export default handler
