const {fs} = require('mz')
const bayes = require('classificator')

function groupBy(collection, property) {
  var i = 0, val, index,
      values = [], result = [];
  for (; i < collection.length; i++) {
      val = collection[i][property];
      index = values.indexOf(val);
      if (index > -1)
          result[index].push(collection[i]);
      else {
          values.push(val);
          result.push([collection[i]]);
      }
  }
  return result;
}

function init () {
  const classifier = bayes()

  return fs.readFile('training_articles.json', 'utf8')
    .then(JSON.parse)
    .then(articles => groupBy(articles, 'category')
      .forEach(group => {
        const category = group[0].category
        const documents = group.map(a => a.text)
        documents.forEach(doc => classifier.learn(doc, category))
      })
    )
    .then(() => classifier)
}

function classify (classifier, text) {
  return classifier.categorize(text)
}

async function test () {  
  const classifier = bayes()
  const data = await fs.readFile('training_articles.json', 'utf8')
  const articles = JSON.parse(data)
  
  groupBy(articles, 'category')
    .forEach(group => {
      const category = group[0].category
      const documents = group.map(a => a.text)
      documents.forEach(doc => classifier.learn(doc, category))
    })

  /* classifier.train() */
  console.log('belfold', classifier.categorize('orbán egy geci').predictedCategory)
  console.log('kulfold', classifier.categorize(`
  Mennyi ér az 5G szolgáltatást lehetővé tevő technológia, mi várható az 5G frekvenciatendereken Európában és – vélhetően idén ősszel – Magyarországon? A kérdésfelvetés nem is lehetne aktuálisabb hazánkban, hiszen a Nemzeti Média- és Hírközlési Hatóság (NMHH) nyilvánosságra hozta a tervezett árverés 5G sávjainak kikiáltási árát. A kérdésre többféle megközelítésből is kereshetjük a választ: vizsgálhatjuk verseny alapon, méghozzá úgy, hogy megnézzük az eddigi EU-s 5G tenderek eredményeit, de megvizsgálhatjuk abban a vonatkozásban is, hogy vajon a leendő bevétel oldal milyen nagyságrendű (már ha egyáltalán képes fedezni meghatározott időtávon a beruházásokat). Az árazás mindkét úton meglehetős bizonytalanságokat takar.
  
  Mennyit ér az 5G használatához szükséges frekvencia? Ezt a kérdést teszik fel maguknak mostanában a szolgáltatók, mivel idén ősszel és jövőre Európában mindenütt le kell bonyolítani ezeknek a frekvenciáknak a tendereztetését, erről maga az Európai Unió rendelkezett, hogy javítsa a közös piac versenyképességét a nagyvilágban. Erre alapvetően két frekvencia sáv szolgál, a tagországoknak a 700 MHz-es sávot, valamint a 3,4-3,8 GHz-es tartományt kell felszabadítaniuk, és felkínálniuk a potenciális vevőknek.
  
  A két tartományból a 700 MHz-esnek valamivel nagyobb a jelentősége: egyrészt az alacsonyabb frekvenciasáv hatékonyabb fejlesztésre ad lehetőséget így önmagában értékesebb, másrészt a Magyarországon június elejétől már kommunikációjában is negyedik mobilszolgáltatóként jelentkező Digi a 3,4-3,8 GHz-es sávon már igen, a 700 MHz-esen viszont még nem rendelkezik felhasználói blokkokkal és megfelelő minőségű szolgáltatás nyújtásához a későbbiekben erre (is) szüksége lehet.
  
  Az elmúlt két évben eddig lezajlott frekvencia tenderek tanulmányozása arra mutat rá, hogy a „mennyit ér kérdésre” meglehetősen széles tartományban születtek válaszok. Az átlagosan elfogadott és használt mutató – 20 évre korrigált egy főre jutó ár – szerint a 700 MHz-es tartományban a legmagasabb ár 0,73 euró/MHz/fő volt Olaszországban, a legalacsonyabb pedig 0,24 Finnországban, míg a 3 GHz feletti tartományban 0,02 (Csehország) és 0,38 euró (Olaszország) között szóródtak az értékek.`).predictedCategory)
  /*  classifier.addDocuments(groupBy(prop('belföld'))(articles).map(a => a.text), 'belföld')
  classifier.addDocuments(groupBy(prop('külföld'))(articles).map(a => a.text), 'külföld')
  classifier.addDocuments(groupBy(prop('szórakozás'))(articles).map(a => a.text), 'szórakozás')
  classifier.addDocuments(groupBy(prop('tudomány'))(articles).map(a => a.text), 'tudomány')
  classifier.addDocuments(groupBy(prop('gazdaság'))(articles).map(a => a.text), 'gazdaság')
  classifier.addDocuments(groupBy(prop('kultúra'))(articles).map(a => a.text), 'kultúra')
  classifier.addDocuments(groupBy(prop('sport'))(articles).map(a => a.text), 'sport')
  
  classifier.train()

  console.log(classifier.getClassifications('orbán egy geci')) */
}

module.exports = {
  init,
  classify,
  test
}
