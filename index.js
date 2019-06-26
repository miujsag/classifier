const category = require('./lib/category')
const bayes = require('./lib/category/bayes')

module.exports = {
  extractCategoryFromCandidates: category.extractFromCandidates,
  extractCategoryFromUrl: category.extractFromUrl,
  extractCategoryFromContent: category.extractFromContent
}
