const cheerio = require("cheerio");
const exceptions = require("./exceptions");

const urlRegex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;

function filterURL(url) {
  const found = exceptions.some((exception) => url.includes(exception));

  if (!found) {
    return url;
  }
}

function removeSubDomain(url) {
  if (!url) {
    return url;
  }

  const [protocol, domain] = url.split("//");
  const splittedDomain = domain.split(".");

  if (splittedDomain.length > 2) {
    return protocol + "//" + splittedDomain.slice(-2).join(".");
  }

  return url;
}

function extractURL(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = "https:" + url;
  }

  if (!urlRegex.test(url)) {
    return null;
  }

  try {
    const { origin } = new URL(url);
    const candidate = removeSubDomain(origin);

    return {
      url,
      origin,
      candidate,
    };
  } catch (error) {
    console.log(error.message);

    return null;
  }
}

function removeDuplicates(accumulator, current) {
  if (!current || !current.url) {
    return accumulator;
  }

  if (accumulator.find((reference) => reference.url === current.url)) {
    return accumulator;
  }

  return [...accumulator, current];
}

function extract(html, selector) {
  if (!html) {
    return [];
  }

  const $ = cheerio.load(html);

  return $(selector + " a")
    .map(function () {
      return $(this).attr("href");
    })
    .get()
    .filter(filterURL)
    .map(extractURL)
    .reduce(removeDuplicates, []);
}

module.exports = {
  extract,
};
