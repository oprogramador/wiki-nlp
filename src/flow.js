const _ = require('lodash');
const addCommas = require('./addCommas');
const convertSynonyms = require('./convertSynonyms');
const convertBn = require('./convertBn');
const convertDateRanges = require('./convertDateRanges');
const convertDecades = require('./convertDecades');
const convertNumbers = require('./convertNumbers');
const convertPercent = require('./convertPercent');
const convertPunctuation = require('./convertPunctuation');
const groupAnd = require('./groupAnd');
const groupArticles = require('./groupArticles');
const groupDates = require('./groupDates');
const groupNumbers = require('./groupNumbers');
const groupOr = require('./groupOr');
const groupPrepositions = require('./groupPrepositions');
const groupVerbs = require('./groupVerbs');
const includeDates = require('./includeDates');
const itemize = require('./itemize');
const removeMeaningless = require('./removeMeaningless');

const flow = (phrases) => {
  const groups = phrases.map(phrase => _.flow(
    convertPunctuation,
    removeMeaningless,
    addCommas,
    groupDates,
    convertPercent,
    convertBn,
    convertSynonyms,
    groupNumbers,
    convertNumbers,
    groupArticles,
    convertDecades,
    groupAnd,
    groupOr,
    itemize,
    groupAnd,
    convertDateRanges,
    groupVerbs,
    includeDates,
    groupPrepositions,
  )(phrase));

  return groups;
};

module.exports = flow;
