import fetch from 'node-fetch'

let handler = async (m, {conn, usedPrefix, args, command, text}) => {
    if (!text) throw `Daerah mana yang mau dicek?\n contoh: *${usedPrefix}${command} weleri*`
    try {
        let anu = await (await fetch(`https://api.lolhuman.xyz/api/cuaca/${text}?apikey=${api.lol}`)).json()
        if (anu.result == 0) throw Error('Daerah yang dicari tidak ditemukan')
        let i = anu.result
        let txt = '*Hasil Prakiraan Cuaca*'
        txt += `\n\nTempat: *${i.tempat}*\n`
        txt += `Latitude: *${i.latitude}*\n`
        txt += `Longitude: *${i.longitude}*\n`
        txt += `Cuaca: *${i.cuaca}*\n`
        txt += `Deskripsi: *${i.description}*\n`
        txt += `Kelembapan: *${i.kelembapan}*\n`
        txt += `Suhu: *${i.suhu}*\n`
        txt += `Udara: *${i.udara}*\n`
        txt += `Permukaan Laut: *${i.permukaan_laut}*\n`

        await m.reply(txt)
    } catch (e) {
        m.reply('Server Down')
    }
}

handler.tags = ['information']
handler.menu = ['cuaca <daerah>']
handler.command = /^(cuaca)$/i