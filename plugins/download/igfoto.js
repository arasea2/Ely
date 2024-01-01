import fetch from "node-fetch"

let handler = async (m, {conn, usedPrefix, command, text}) => {
    if(!text) throw "Linknya?"
    try {
        m.reply(wait)
        let res = await( await fetch(`https://api.lolhuman.xyz/api/instagram?apikey=${api.lol}&url=${text}`)).json()
        if(res.status == 200) {
            for (let i of res.result) {
                await conn.sendMsg(m.chat, {image: {url: i}}, {quoted: m})
            }
        } else {
            m.reply(res.status)
        }
    } catch(e) {
        m.reply('Server Down')
    }
}

handler.menudownload = ['fotoinstagram <url>']
handler.tagsdownload = ['search']
handler.command = /^(fotoinstagram|figdl|fig|fotoinstagramdl)$/i
handler.limit = true

export default handler