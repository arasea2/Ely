import fetch from 'node-fetch'
import uploadImage from '../../lib/uploadImage.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let name = await conn.getName(who)
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'Kirim/Reply audio music Dengan Caption .whatmusic'
    m.reply('Mohon Ditunggu ^^')
    let media = await q.download()
    let url = await uploadImage(media)
    let res = await (await fetch(`https://api.lolhuman.xyz/api/musicsearch?apikey=${api.lol}&file=${url}`)).json()
    let i = res.result
    let txt = `Title: ${i.title}\n`
    txt += `Album: ${i.album}\n`
    txt += `Artists: ${i.artists}\n`
    // Math.ceil((i.duration / (60 * 1000)) * 100) / 100
    txt += `Duration: ${Math.ceil((i.duration / (60 * 1000)) * 100) / 100}\n`
    txt += `Release: ${i.release}\n`

    txt += `Genres: ${i.genres}`

    await m.reply(txt)
    // await conn.sendFile(m.chat, hasil.result, '', 'Nih Kak, Maaf Kalau Hasilnya Tidak Sesuai Keinginan', m)
}
handler.help = ['whatmusic']
handler.tags = ['searching']
handler.command = /^(whatmusic)$/i

handler.limit = true
handler.premium = true

export default handler
