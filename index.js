const category = require('./lib/category')
const bayes = require('./lib/category/bayes')

module.exports = {
  extractCategoryFromCandidates: category.extractFromCandidates,
  extractCategoryFromUrl: category.extractFromUrl,
  initBayesClassifier: bayes.init,
  classifyWithBayes: bayes.classify
}

/* bayes
  .init()
  .then(classifier => bayes.classify(classifier, `

  Kedden délután kiderült, a bolgár Ludogorec Razgrad együttesével találkozik a Ferencváros a labdarúgó Bajnokok Ligája selejtezőjének első fordulójában. Az élő közvetítésben még az az információ hangzott el, hogy a Fradi idegenben kezd, az UEFA azonban később felcserélte a pályaválasztói jogot.
  
  Ennek szerettünk volna utánajárni, így e-mailben megkerestük az Európai Labdarúgó Szövetség sajtóosztályát, hogy adjon valamilyen tájékoztatást, vagy magyarázatot, miért cserélték meg a párosítást, azaz miért az első meccset, és miért nem a visszavágót játsszák a Groupama Arénában - ahogyan az az élő közvetítésben elhangzott.
  
  Bár az UEFA annyit megtett, hogy válaszolt, semmilyen indokkal nem szolgált, csupán megköszönte az érdeklődést, és csatolmányként elküldte az összes párosítást - amit már eddig is tudtunk.
  
  A sorsolással kapcsolatban több vélemény is napvilágot látott. Akik figyelték az élő adást, láthatták, hogy  a Fradit és a bolgár bajnokot az utolsó párban húzták ki. Ekkor két golyó volt az ibrikben, de a sorsolást végző nem keverte meg a golyókat, és ez volt a szabálytalan. Vannak, akik szerint emiatt megismételték a procedúrát, de ezt az UEFA nem erősítette meg. 
  
  Az UEFA-nak küldött levelünkre kapott válasszal nem lettünk tehát okosabbak, így a Fradinak úgy tűnik le kell nyelnie ezt a békát, pedig a papíron egyébként is esélyesebb rivális ellen némi előnyt jelenthetett volna egy esetlegesen idegenben elért jó eredmény. Ettől függetlenül Orosz Pál és Szergej Rebrov is bízik a bravúrban.
  `))
  .then(console.log)
  .catch(console.log) */

/* 
const categories = [
  {
    "name": "belföld",
    "alias": ["belföld", "belfold", "itthon", "kozelet", "közélet", "budapest"]
  },
  {
    "name": "külföld",
    "alias": ["külföld", "kulfold", "nagyvilag", "nagyvilág", "vilag", "világ"]
  },
  {
    "name": "gazdaság",
    "alias": ["gazdaság", "gazdasag", "penz", "pénz", "kkv"]
  },
  {
    "name": "sport",
    "alias": ["sport", "f1", "futball", "foci"]
  },
  {
    "name": "kultúra",
    "alias": ["kultúra", "zene", "kultura"]
  },
  {
    "name": "tudomány",
    "alias": ["tudomány", "tudomany", "tech", "techbazis"]
  }
]

const article = {
  url: '"http://hvg.hu/itthon/20190601_Ujhelyi_Brusszelbe_megy_Bangone_meg_csak_ugy#rss"',
  candidates: ['lol', 'wut', 'belfold']
}
 
console.log('fromCandidates')
console.log(category.extractFromCandidates(null, article.candidates, categories))
console.log('fromURL')
console.log(category.extractFromUrl(null, article.url, categories))
console.log('pipe')
console.log(category.extractFromCandidates(
  category.extractFromUrl(null, article.url, categories),
  article.lol,
  categories
)) 
*/