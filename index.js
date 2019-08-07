const category = require('./lib/category')

module.exports = {
  extractCategoryFromCandidates: category.extractFromCandidates,
  extractCategoryFromUrl: category.extractFromUrl,
  extractCategoryFromContent: category.extractFromContent
}
