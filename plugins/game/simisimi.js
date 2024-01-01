import fetch from 'node-fetch'

let handler = async (m, {conn, usedPrefix, command, text}) => {
    if (!text) throw `Example: *${usedPrefix}${command} Hallo Simi*`
    try {
        let anu = await (await fetch(`https://api.lolhuman.xyz/api/simi?apikey=${api.lol}&text=${text}&badword=false`)).json()

        await m.reply(anu.result)
    } catch (e) {
        m.reply('Server Down')
    }
}

handler.menufun = ['simisimi <text>']
handler.tagsfun = ['game']
handler.command = /^(simi)$/i

export default handler
