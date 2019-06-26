const trainingData = require('./training.js')
const bayes = require('classificator')

function classify () {
  const classifier = bayes.fromJson(trainingData)

  return function (text) {
    return classifier.categorize(text).predictedCategory
  }
}

module.exports = {
  classify
}
