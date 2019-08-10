const test = require('ava')
const Classifier = require('../../index')()

const categories = [
  {
    name: 'belföld',
    alias: ['belföld', 'belfold', 'itthon', 'kozelet', 'közélet', 'budapest', 'ketharmad', 'belpol']
  },
  {
    name: 'külföld',
    alias: ['külföld', 'kulfold', 'nagyvilag', 'nagyvilág', 'vilag', 'világ', 'amerika-london-parizs', 'kulpol']
  }
]

test('extractCategoryFromContent should return category', function (t) {
  t.deepEqual(Classifier.extractCategoryFromContent(
    undefined,
    'Az Index megkereste a Pest megyei rendőrséget, ahonnan azt a választ kaptuk, hogy az ügyben a Monori rendőrkapitányságon indult eljárás súlyos testi sértés miatt ismeretlen tettes ellen. Arra a kérdésünkre, hogy felmerült-e a gyűlölet bűncselekmény gyanúja, illetve, hogy van-e már gyanúsított, nem kaptunk választ. Mint írták, a nyomozás jelenlegi szakaszában bővebb információt nem adnak.', categories), {
    name: 'belföld',
    alias: ['belföld', 'belfold', 'itthon', 'kozelet', 'közélet', 'budapest', 'ketharmad', 'belpol']
  })
})
