import axios from "axios"
import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if(!text) throw `Contoh: ${usedPrefix + command} Girl Pink Hair`
    await m.reply(wait);
    try {
        let res = await (await fetch(`https://api.neoxr.eu/api/waifudiff?q=${text}`)).json()
        await conn.sendMsg(m.chat, { image: { url: res.data.url } }, { quoted: m })
    } catch (e) {
        console.log(e);
        m.reply('Server down');
    }
}

handler.help = ['aiwaifu <prompt>']
handler.tags = ['aimenu']
handler.command = /^(aiwaifu)$/i

handler.limit = 2
handler.premium = true

export default handler