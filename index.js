const classificator = require('classificator')
const Bayes = require('./lib/category/bayes')(classificator)
const Category = require('./lib/category')(Bayes)

module.exports = function () {
  return {
    Category
  }
}
