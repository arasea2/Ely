import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  let [lvl, bexp] = text.split(/[^\w\s]/g)
  if (!lvl) throw `Contoh: ${usedPrefix}${command} 190|50`
  if (!bexp) bexp = '0'
  try {
    axios.get(`https://toram-id.info/leveling?level=${lvl}&bonusexp=${bexp}&range=5`)
      .then((response) => {
        if (response.status === 200) {
          const html = response.data;
          const $ = cheerio.load(html);
          let array = []
          $('tr.text-danger').each(function (i, elem) {
            array[i] = {
              boss: $(this).find('.px-2 > div').text().trim(),
              location: $(this).find('.text-muted > a').text().trim(),
              exp: $(this).find('.text-primary').text().trim()
            }
          });
          let gb = `*Leveling lvl ${lvl} & bonus exp ${bexp}*\n`
          for (let i = 0; i < array.length; i++) {
            gb += `_______________________________\nBoss: ${array[i].boss}\nLocation: ${array[i].location}\nEXP: ${array[i].exp}\n`
          }
          m.reply(gb)
          console.log(array[0])
        }
      })
  } catch (e) {
    m.reply('Server Down')
  }
}

handler.menutoram = ['leveling <level|bonusExp>']
handler.tagstoram = ['toram']
handler.command = /^(leveling|lvlng)$/i

export default handler

