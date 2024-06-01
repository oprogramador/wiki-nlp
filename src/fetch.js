const _ = require('lodash');
const wiki = require('wikijs').default;
const groupPrepositions = require('./groupPrepositions');
const groupArticles = require('./groupArticles');
const groupAnd = require('./groupAnd');
const groupOr = require('./groupOr');
const groupVerbs = require('./groupVerbs');
const removeMeaningless = require('./removeMeaningless');
const convertPunctuation = require('./convertPunctuation');
const addCommas = require('./addCommas');
const convertNumbers = require('./convertNumbers');
const groupDates = require('./groupDates');

(async () => {
  const data = await wiki().page('European Union');
  const text = await data.rawContent();
  const phrases = text
    .split('\n')
    .map(line => line.replace(/\.$/, '. ').split('. '))
    .flat();
  const words = phrases.map(phrase => phrase.split(/\s/).filter(word => word));
  const groups = words.map(phrase => _.flow(
    convertPunctuation,
    removeMeaningless,
    groupArticles,
    convertNumbers,
    groupDates,
    addCommas,
    groupAnd,
    groupOr,
    groupPrepositions,
    groupVerbs,
  )(phrase));
  console.log(JSON.stringify(groups));
})();
