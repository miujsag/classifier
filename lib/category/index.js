const { URL } = require("url");
const trainingData = require("./training_data");

function findInAlias(candidate, categories) {
  if (!candidate) return null;

  return categories.find((category) => {
    return category.alias.find((alias) => candidate.toLowerCase() === alias);
  });
}

module.exports = function (classifier) {
  const trainedClassifier = classifier.train(trainingData);
  const classify = classifier.classify(trainedClassifier);

  return function (categories) {
    return {
      extractFromCandidates(category, candidates) {
        if (category) return category;

        if (Array.isArray(candidates)) {
          return candidates
            .filter((candidate) => candidate && typeof candidate === "string")
            .map((candidate) => findInAlias(candidate, categories))
            .find((candidate) => candidate);
        } else {
          return findInAlias(candidates, categories);
        }
      },

      extractFromUrl(category, url) {
        if (category) return category;

        const { pathname } = new URL(url);
        const pathFragments = pathname.split("/");

        return this.extractFromCandidates(null, pathFragments, categories);
      },

      extractFromContent(category, content) {
        if (category || !content) return category;

        const candidate = classify(content);

        return findInAlias(candidate, categories);
      },
    };
  };
};
