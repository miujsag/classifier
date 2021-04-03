module.exports = function (bayes) {
  return {
    train (data) {
      return bayes.fromJson(data)
    },

    classify (classifier) {
      return function (text) {
        return classifier.categorize(text).predictedCategory
      }
    }
  }
}
