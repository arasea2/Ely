import fetch from "node-fetch"

let handler = async (m, {conn, usedPrefix, command, text}) => {
    if(!text) throw `Masukkan usernamenya`
    try {
        m.reply(wait)
        let res = await( await fetch(`https://api.lolhuman.xyz/api/igstory/${text}?apikey=${api.lol}`)).json()
        for (let i of res.result) {
            if (i.includes('.mp4') || i.includes('.mkv')) {
                                await conn.sendMsg(m.chat, { video: { url: i } }, { quoted: m })
                                              } else if (i.includes('.jpg') || i.includes('.png') || i.includes('.jpeg') || i.includes('.webp')) {
                                                              await conn.sendMsg(m.chat, { image: { url: i } }, { quoted: m })
                                                                            }
            
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