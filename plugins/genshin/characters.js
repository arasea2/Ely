import fetch from 'node-fetch'

let handler = async (m, {conn, usedPrefix, text, command}) => {
    if(!text[0]) throw `Masukkan Nama Character\n\n *Example : ${usedPrefix + command} Eula*`

    try {
        let anu = await(await fetch(`https://genshin-db-api.vercel.app/api/v5/characters?query=${text}`)).json()
        let txt = `*Found : ${anu.name}*\n`
        txt += `*Title :* ${anu.title}\n`
        txt += `*Description :* ${anu.description}\n\n`
        txt += `*Weapon Type :* ${anu.weaponText}\n`
        txt += `*Element :* ${anu.elementText}\n`
        txt += `*Gender :* ${anu.gender}\n`
        txt += `*Region :* ${anu.region}\n`
        txt += `*Constellation :* ${anu.constellation}\n\n`
        txt += `*Character Voice :*\n`
        txt += `*China* : ${anu.cv.chinese}\n`
        txt += `*Japan* : ${anu.cv.japanese}\n`
        txt += `*English* : ${anu.cv.english}\n`
        txt += `*Korea* : ${anu.cv.korean}\n\n`
        for (let a in anu.costs) {
            txt += `\n*${a}*\n\n`
            // console.log(a)
            for (let i = 0; i < anu.costs[a].length; i++) {
                txt += `*Name :* ${anu.costs[a][i].name}\n`
                txt += `*Jumlah :* ${anu.costs[a][i].count}\n`
            }
        }
        await conn.sendMsg(m.chat, {image: { url: anu.images.cover1  }, caption: txt }, { quotes: m })
    } catch (e) {
        console.log(e)
    }
}

handler.menugenshin = ['gicharacter <place>']
handler.tagsgenshin = ['search']
handler.command = /^((gi|genshin)(char?|chara?|character))$/i

export default handler