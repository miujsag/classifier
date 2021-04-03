const classificator = require("classificator");
const Bayes = require("./lib/category/bayes")(classificator);
const Category = require("./lib/category")(Bayes);
const Reference = require("./lib/reference");

module.exports = function () {
  return {
    Category,
    Reference,
  };
};
