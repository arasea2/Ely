import fetch from "node-fetch"

let handler = async (m, {conn, usedPrefix, command, text}) => {
    if(!text) throw "Judul?"
    try {
        let res = await( await fetch(`https://api.lolhuman.xyz/api/lirik?apikey=${api.lol}&query=${encodeURIComponent(text)}`)).json()
        let txt = `*Lirik dari lagu ${text}*\n\n\n`
        txt += res.result
        await m.reply(txt)
    } catch (e) {
        m.reply('Server Down')
    }
}

handler.help = ['liriklagu <judul>']
handler.tags = ['searching']
handler.command = /^(liriklagu)$/i

handler.limit = true

export default handler