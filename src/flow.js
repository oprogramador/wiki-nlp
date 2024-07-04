const _ = require('lodash');
const addCommas = require('./addCommas');
const convertBn = require('./convertBn');
const convertDateRanges = require('./convertDateRanges');
const convertDecades = require('./convertDecades');
const convertNumbers = require('./convertNumbers');
const convertPercent = require('./convertPercent');
const convertPunctuation = require('./convertPunctuation');
const convertSynonyms = require('./convertSynonyms');
const groupAnd = require('./groupAnd');
const groupArticles = require('./groupArticles');
const groupDates = require('./groupDates');
const groupLocality = require('./groupLocality');
const groupNumbers = require('./groupNumbers');
const groupOr = require('./groupOr');
const groupPrepositions = require('./groupPrepositions');
const groupVerbs = require('./groupVerbs');
const includeDates = require('./includeDates');
const includeLocalities = require('./includeLocalities');
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
    groupLocality,
    groupAnd,
    groupOr,
    itemize,
    groupAnd,
    convertDateRanges,
    groupVerbs,
    includeLocalities,
    includeDates,
    groupPrepositions,
  )(phrase));

  return groups;
};

module.exports = flow;
