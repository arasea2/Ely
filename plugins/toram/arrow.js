let handler = async (m, {conn, usedPrefix, command, text}) => {
    await m.reply(`- *LIST ARROW BERDASARKAN ELEMENTNYA* -\n\n
*Element AIR*
*Arrow :* Panah Es
*Mob :* (Pandai Besi)
*Lokasi :* NPC Pandai Besi
*Stat :*\nBase ATK 17(20%)\nCritical Rate +2

*Arrow :* Panah Cermin Cinta
*Mob :* (Quest) Arwah Peneliti lv. 78
*Lokasi :* Halaman Awal Mula
*Stat :*\nBase ATK 37(20%)\nCSPD +100

*Arrow :* Panah Tangis Langit
*Mob :* Floragonet
*Lokasi :* Distrik Fractum
*Stat :*\nBase ATK 84(20%)\nAkurasi Absolut +1%\nBerhenti Jatuh

*Arrow :* Panah Samudra
*Mob :* (Pandai Besi) event Musim Panas
*Lokasi :* NPC pandai besi
*Stat :*\nBase ATK 110(10%)\nMaxMP +200\nAMPR +1\n_Kebal Angin -3%_

*Element API*
*Arrow :* Panah Api
*Mob :* (Pandai Besi)
*Lokasi :* NPC Pandai Besi
*Stat :*\nBase ATK 5(20%)

*Arrow :* Flame Arrow
*Mob :* Sunion
*Lokasi :* Cermin Kegelapan
*Stat :*\nBase ATK 34(20%)\nMaxMP +100

*Arrow :* Panah Cinta
*Mob :* (Pandai Besi) Event Valentine
*Lokasi :* NPC Pandai Besi
*Stat :*\nBase ATK 71(20%)\nCSPD +100

*Arrow :* Panah Kaisar Iblis
*Mob :* Venena MetaCoenubia
*Lokasi :* Reruntuhan Elban Urban
*Stat :*\nBase ATK 120(10%)\nAkurasi +15%\n_Aggro -15%_

*Arrow :* Panah Ekor Membara
*Mob :* Nagakor
*Lokasi :* Terowongan Cobaan
*Stat :*\nBase ATK 152(20%)\nKebal Api +10%\nReduksi DMG (Bowling) +20%

*Element ANGIN*
*Arrow :* Panah Topan
*Mob :* (Pandai Besi)
*Lokasi :* NPC Pandai Besi
*Stat :*\nBase ATK 15(20%)\nCritical Damage +1%

*Arrow :* Panah Topan
*Mob :* Forestia
*Lokasi :* Tanah Kaos
*Stat :*\nBase ATK 15(20%)\nAkurasi +10%\nCritical Damage +1%

*Arrow :* Panah Apel
*Mob :* Coryn
*Lokasi :* Distrik Dikkit
*Stat :*\nBase ATK 92(15%)\n_Aggro -10%_

*Arrow :* Panah Ratu Lebah
*Mob :* Mieli ( _Event Valentine_)
*Lokasi :* Dataran Rakau
*Stat :*\nBase ATK 150(20%)\nTambahan Fisik 10%\nKebal Air +5%\nBerhenti Jatuh

*Element Bumi*
*Arrow :* Panah Bijih Tajam
*Mob :* Tikus Gua
*Lokasi :* Reruntuhan Singolare : Lantai 1
*Stat :*\nBase ATK 43(20%)\nDeff +50\nKekebalan Fisik +3%\n_Akurasi -1%_

*Arrow :* Panah Cacao
*Mob :* (Pandai Besi) Event Valentine
*Lokasi :* NPC Pandai Besi
*Stat :*\nBase ATK 50(20%)\nCritical Rate +3\n_Aggro -6%_

*Arrow :* Panah Daun Berduri
*Mob :* Ghilly ( _Event Valentine_ )
*Lokasi :* Dataran Sable
*Stat :*\nBase ATK 110(20%)\nMaxHP +10%\nPelindung Fraksional +10%\nAggro +10%

*Arrow :* Panah Hutan Lindung
*Mob :* Arbogazella
*Lokasi :* Hutan Lindung : Rimba Sesat
*Stat :*\nBase ATK 163(20%)\nAkurasi +50%\n_Aggro -25%_\n_Luka ke Api -10%_\n_Luka ke Cahaya -20%_

*Element CAHAYA*
*Arrow :* Flash Volt
*Mob :* (Quest) Rasa Lezat Kenangan
*Lokasi :* NPC Juan (El Scaro)
*Stat :*\nBase ATK 3(15%)\nAkurasi +10\n_Luka ke Cahaya -50%_\n( _Dengan Bowgun_ )\nCritical Rate +10

*Arrow :* Panah Seni Permen
*Mob :* (Pandai Besi) Event Valentine
*Lokasi :* NPC Pandai Besi
*Stat :*\nBase ATK 56(20%)\nMdef +10%\nKekebalan Sihir +10%


*Arrow :* Panah Pohon Suci
*Mob :* Santabby ( _Event Natal_ )
*Lokasi :* Paviliun Tomte : Pintu Masuk
*Stat :*\nBase ATK 100(20%)\nAMPR +1\nKebal Gelap +10%

*Element GELAP*
*Arrow :* Panah Senja
*Mob :* Naga Senja
*Lokasi :* Benteng Solfini : Atap
*Stat :*\nBase ATK 40(20%)\nResistensi Status Buruk +5%\n_MaxHP 10%_

*Arrow :* Panah Duri
*Mob :* Ivy
*Lokasi :* Kuil Naga Kegelapan
*Stat :*\nBase ATK 79(20%)\nKekebalan Siir +5%\nReduksi MDG (Lantai) +5%

*Arrow :* Panah Sakura Senja
*Mob :* Amalgam ( _Event Hanami_ )
*Lokasi :* Benteng Sakura Senja
*Stat :*\nBase ATK 100(20%)\nKebal Cahaya +5%

*Arrow :* Panah Hantu
*Mob :* Manomare
*Lokasi :* Hutan Phasma
*Stat :*\nBase ATK 120(20%)\nTambahan Sihir 50%\nBantuan Skti (1 Detik)

*Normal*
*Arrow :* Panah Jelita
*Mob :* Sakura Merah Jelita
*Lokasi :* Air Terjun Pemabuk
*Stat :*\nBase ATK 136(20%)\nLuka ke Normal +5%\nNatural HP Regen +10%\n_Aggro -20%_
`)
}

handler.tagstoram = ['toram']
handler.menutoram = ['arrow']
handler.command = /^(arrow|panah)$/i

export default handler
