const test = require('ava')

const bayesDummy = {
  train () {
    return undefined
  },

  classify () {
    return function () {
      return 'belfold'
    }
  }
}

const Category = require('../../lib/category')(bayesDummy)

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

test('extractFromCandidates should return category if provided', function (t) {
  t.deepEqual(Category.extractFromCandidates({ name: 'test' }, [], categories), { name: 'test' })
})

test('extractFromCandidates should return undefined if no category found', function (t) {
  t.is(Category.extractFromCandidates(undefined, 'test', categories), undefined)
})

test('extractFromCandidates should return category if found', function (t) {
  t.deepEqual(Category.extractFromCandidates(undefined, 'belfold', categories), {
    name: 'belföld',
    alias: ['belföld', 'belfold', 'itthon', 'kozelet', 'közélet', 'budapest', 'ketharmad', 'belpol']
  })
})

test('extractFromUrl shoud return category if provided', function (t) {
  t.deepEqual(Category.extractFromUrl({ name: 'test' }, 'https://index.hu/kulfold/2019/08/10/lovoldozes_volt_osloban_egy_mecsetnel/', categories), { name: 'test' })
})

test('extractFromUrl shoud return undefined if no category found', function (t) {
  t.is(Category.extractFromUrl(undefined, 'https://index.hu/mindekozben/poszt/2019/08/06/szuperembert_csinal_barkibol_a_robotfarok/', categories), undefined)
})

test('extractFromUrl should return category if found', function (t) {
  t.deepEqual(Category.extractFromUrl(undefined, 'https://index.hu/kulfold/2019/08/10/lovoldozes_volt_osloban_egy_mecsetnel/', categories), {
    name: 'külföld',
    alias: ['külföld', 'kulfold', 'nagyvilag', 'nagyvilág', 'vilag', 'világ', 'amerika-london-parizs', 'kulpol']
  })
})

test('extractFromContent should return category if provided', function (t) {
  t.deepEqual(Category.extractFromContent({ name: 'test' }, 'test', categories), { name: 'test' })
})

test('extractFromContent should return category if found', function (t) {
  t.deepEqual(Category.extractFromContent(undefined, 'test', categories), {
    name: 'belföld',
    alias: ['belföld', 'belfold', 'itthon', 'kozelet', 'közélet', 'budapest', 'ketharmad', 'belpol']
  })
})
