import fetch from "node-fetch"

let handler = async (m, {conn, usedPrefix, command, text}) => {
    if(!text) throw `Masukkan usernamenya`
    try {
        m.reply(wait)
        let res = await( await fetch(`https://api.lolhuman.xyz/api/igstory/${text}?apikey=${api.lol}`)).json()
        for (let i of res.result) {
            await conn.sendMsg(m.chat, {video: {url: i}}, {quoted: m})
        }
    } catch (e) {
        m.reply("Server Down / Username tidak ditemukan")
    }
}

handler.menudownload = ['instastory <url>']
handler.tagsdownload = ['search']
handler.command = /^(instastory|storyinstagram|igstory|storyig|storiinstagram|storiig|igstori)$/i
handler.limit = true

export default handler