import fetch from 'node-fetch'
import uploadImage from '../../lib/uploadImage.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw 'Kirim/Reply Gambar Dengan Caption .upscale'
m.reply('Mohon Ditunggu ^^')
let media = await q.download()
let url = await uploadImage(media)
let hasil = await (await fetch(`https://api.lolhuman.xyz/api/upscale?apikey=${api.lol}&img=${url}`)).buffer()
await conn.sendFile(m.chat, hasil, '', 'Nih Kak, Maaf Kalau Hasilnya Tidak Sesuai Keinginan', m)
}
handler.help = ['upscale']
handler.tags = ['aimenu']
handler.command = /^(upscale)$/i

handler.limit = true
handler.premium = true

export default handler
