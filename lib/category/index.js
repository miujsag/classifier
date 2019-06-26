const {parse} = require('url')
const {classify} = require('./bayes')

const classifyContent = classify()

function findInAlias(candidate, categories) {
  if (!candidate) return null

  return categories.find(category => {
    return category.alias.find(alias => candidate.toLowerCase() === alias)
  })
}

function extractFromCandidates (category, candidates, categories) {
  if (category) return category
  
  if (Array.isArray(candidates)) {
    return candidates
      .filter(candidate => candidate && typeof candidate === 'string') 
      .map(candidate => findInAlias(candidate, categories))
      .find(candidate => candidate)
  } else {
    return findInAlias(candidates, categories)
  }
}

function extractFromUrl (category, url, categories) {
  if (category) return category

  const { pathname } = parse(url)
  const pathFragments = pathname.split('/')

  return extractFromCandidates(null, pathFragments, categories)
}

function extractFromContent (category, content, categories) {
  if (category) return category
  
  const candidate = classifyContent(content)

  return findInAlias(candidate, categories)
}

module.exports = {
  extractFromCandidates,
  extractFromUrl,
  extractFromContent
}
