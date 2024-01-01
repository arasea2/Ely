import axios from 'axios'
import cheerio from 'cheerio';
let handler = async (m, { conn, usedPrefix, command, text }) => {
    const dyeimage = 'https://toram-id.info/img/dye_code.png'
    await axios.get(`https://toram-id.info/dye`)
        .then((response) => {
            if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html)
                const array = []
                const caption = $('table > caption').text().trim()
                $("tr").each(function (i, elem) {
                    array[i] = {
                        boss: $(this).find('td:nth-child(1) > div > b').text().trim(),
                        map: $(this).find('td:nth-child(1) > div > small').text().trim(),
                        a: $(this).find('td:nth-child(2)').text().trim(),
                        b: $(this).find('td:nth-child(3)').text().trim(),
                        c: $(this).find('td:nth-child(4)').text().trim(),
                    }
                })

                let txt = `*${caption}*\n\n`
                for (let i = 1; i < array.length; i++) {
                    txt += `Boss : ${array[i].boss}\n`
                    txt += `Map : ${array[i].map}\n`
                    txt += `Dye A : ${array[i].a}\n`
                    txt += `Dye B : ${array[i].b}\n`
                    txt += `Dye C : ${array[i].c}\n`
                    txt += `-----------------------------------\n`
                }
                conn.sendMsg(m.chat, {image: {url: dyeimage}, caption: txt}, {quoted: m})
            }
        })

}

handler.menutoram = ['dye']
handler.tagstoram = ['toram']
handler.command = /^(dye|listdye)$/i

export default handler