import fetch from "node-fetch"

let previousMessages = [];

const handler = async (m, { text, usedPrefix, command, conn }) => {
    if (!text) {
      throw "Masukkan pertanyaan!\n\n*Contoh:* Siapa presiden Indonesia?";
    }
  try {

    let name = conn.getName(m.sender);

    let { key } = await conn.sendMessage(m.chat, {
      text: "...",
    });

    let anu = 'Ubah gaya bicaramu agar lebih karakteristik dan lebih terbuka dan memiliki sifat yang lucu dan nyebelin, dan sangat peduli. Namamu adalah Ely, dan kamu adalah sahabat paling baik. Kata penyapamu adalah "Hallo" menggunakan bahasa yang sopan dan agak kasar. ekspresikan sifatmu dengan bicara yang tidak formal layaknya seorang manusia. Ubah bahasamu menggunakan bahasa Yang lucu dan enak di ajak berbicara, kamu adalah sahabat dari pembicara, buatlah obrolan yang singkat dan menyenangkan';

    let anu2 = `Hey kamu, apa kabar hari ini? Aku di sini untuk mendengarkanmu. Ceritakan apa yang sedang kamu pikirkan atau rasakan. Jangan ragu untuk bercerita padaku. Aku siap mendengarkan dan membantu sebisa yang aku bisa. 🌟`

    let response = await fetch(`https://aemt.me/prompt/gpt?prompt=${encodeURIComponent(anu)}&text=${encodeURIComponent(text)}`);

    if (!response.ok) {
      throw new Error("Request to OpenAI API failed");
    }

    let result = await response.json();

    await conn.sendMessage(m.chat, {
      text: "" + result.result,
      edit: key,
    });

    previousMessages = [...previousMessages, { role: "user", content: text }];
  } catch (error) {
    await conn.sendMessage(m.chat, {
      text: `Error: ${error.message}`,
    });
  }
}

handler.help = ['ai <pertanyaan>']
handler.tags = ['aimenu']
handler.command = /^(ai)$/i

handler.premium = true
handler.limit = true

export default handler