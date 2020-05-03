const rake = require('node-rake')
const stopwords = require('./stopwords')

const opts = {stopwords};
console.log(stopwords.join('|'))
const keywords = rake.generate(normalizeText('Haszonállatból szőrős gyerek Ennek a szakértők szerint főleg demográfiai oka van, ugyanis a nagycsaládok eltűnésével egyre több az idős ember, akik négylábú társat választanak maguk mellé, valamint a fiatalok körében egyre jobban kitolódik a gyerekvállalás ideje, és sokan kezdetben – vagy akár végleg – háziállattal pótolják a saját gyereket. De nemcsak az egyedszám számít, sokat nyom a latba az is, hogy mennyit hajlandó a gazda költeni állatára. Az elfogyasztott mennyiség inkább az állat igényeitől, mint a gazdától függ – viszonylag kevesen tervezik halálra etetni kedvencüket –, mégis gyakorlatilag bármennyi pénzt ott tud hagyni az ember az kisállateledel-boltban. A kutya- és macskatápok ára a kilónként néhány száztól a több ezer forintig terjed. Változnak az állattartási szokások is, a sufni mögé egyméteres láncra kicsapott, rozsdás lábasban ételmaradékon tartott kutyákat, és a fogyóeszközként ház körül szaporodó macskákat a családtagként kezelt állatok váltják. Alapból fontos átalakulás, hogy a házi kosztot kiszorítja a táp. Ez az úgynevezett calorific coverage, az a szám, amely megmutatja, hogy egy országban arányaiban mennyien etetik gyártott táppal háziállatukat. Általánosságban azt lehet mondani, hogy Európán belül a magasabb GDP-vel rendelkező nyugati országokban magasabb ez az arány is, 60-80 százalék körül mozog, de ott is vannak eltérések – például Hollandiában kifejezetten magas, Franciaországban viszont alacsonyabb. Kelet-Európában jóval alacsonyabb ez a szám, azonban mindenhol folyamatosan nő, egyre nagyobb a táppal etetők aránya. Bodrinak csak a legjobbat A termékmix eltolódik, egyre nő a prémium, valamint kisebb kiszerelésű, drágább termékek aránya. Egy alutasakos vagy pástétom kiszerelésű állateledel fajlagosan akár négy-ötször annyiba is kerülhet, mint a nagy kiszerelésű zsákos tápok. Így a kereskedőknek és a gyártóknak is az az érdeke, hogy ezek felé, valamint általában a szofisztikáltabb termékek (fogvédő, vitamin) felé tereljék a vásárlókat. '), opts)
console.log(keywords)

function normalizeText (text) {
  return text
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    .replace(/ +(?= )/g, '')
}