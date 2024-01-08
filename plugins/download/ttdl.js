import fetch from 'node-fetch'

let handler = async (m, {conn, usedPrefix, command, text}) => {
    if (!text) throw `Linknya?\nExmple: *${usedPrefix}${command} https://vt.tiktok.com/ZSwWCk5o/*`
    m.reply(wait)
    try {
        let anu = await(await fetch(`https://api.lolhuman.xyz/api/tiktok2?apikey=${api.lol}&url=${text}`)).json()
        for ( let i of anu.result ){
            if (i.includes('.mp4') || i.includes('.mkv')) {
                                await conn.sendMsg(m.chat, { video: { url: i } }, { quoted: m })
                                              } else if (i.includes('.jpg') || i.includes('.png') || i.includes('.jpeg') || i.includes('.webp')) {
                                                              await conn.sendMsg(m.chat, { image: { url: i } }, { quoted: m })
                                                                            }
            
        }
    } catch (e) {
        m.reply('invalid url / server down')
    }
    
}

handler.menudownload = ['tiktok <url>']
handler.tagsdownload = ['search']
handler.command = /^(tiktok|ttdl|tt|tiktokdl)$/i

handler.limit = true

export default handler