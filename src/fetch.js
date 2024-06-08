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
const includeDates = require('./includeDates');
const splitText = require('./splitText');

(async () => {
  const data = await wiki().page('European Union');
  const text = await data.rawContent();
  const words = splitText(text);
  const groups = words.map(phrase => _.flow(
    convertPunctuation,
    removeMeaningless,
    addCommas,
    groupArticles,
    groupAnd,
    groupDates,
    convertNumbers,
    groupOr,
    groupVerbs,
    includeDates,
    groupPrepositions,
  )(phrase));
  console.log(JSON.stringify(groups));
})();
