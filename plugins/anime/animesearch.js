import fetch from 'node-fetch'

let handler = async (m, {conn, usedPrefix, command, text}) => {
    if (!text) throw `Contoh: *${usedPrefix}${command} Anohana`
    try {
        let anu = await (await fetch(`https://api.lolhuman.xyz/api/anime?apikey=${api.lol}&query=${text}`)).json()
        if (anu.result == 0) throw Error('Anime yang anda cari tidak ditemukan')
        let txt = ``
        let i = anu.result
            txt += `Title: *${i.title.romaji} (${i.title.english})*\n\n`
            txt += `Episode: *${i.episodes}*\n\n`
            txt += `Durasi: *${i.duration}M*\n\n`
            txt += `Status: *${i.status}*\n\n`
            for (let a of i.genres) {
                txt += `Genre: *${a}*\n\n`
            }
            txt += `Tanggal Mulai: *Tahun ${i.startDate.year}, Bulan ${i.startDate.month}, Tanggal ${i.startDate.day}*\n\n`
            txt += `Tanggal Selesai: *Tahun ${i.endDate.year}, Bulan ${i.endDate.month}, Tanggal ${i.endDate.day}*\n\n`
            txt += `Sinopsis: ${i.description}\n`
        await conn.sendMsg(m.chat, {image: { url: anu.result.coverImage.large }, caption: txt }, { quotes: m })
    } catch (e) {
        m.reply('Judul tidak ditemukan / Server  Down')
    }
}

handler.menuanime = ['carianime']
handler.tagsanime = ['search']
handler.command = /^(carianime)$/i

export default handler