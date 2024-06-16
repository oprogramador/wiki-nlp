const _ = require('lodash');
const addCommas = require('./addCommas');
const convertBn = require('./convertBn');
const convertDateRanges = require('./convertDateRanges');
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
    convertDateRanges,
    convertPercent,
    convertBn,
    groupNumbers,
    convertNumbers,
    groupArticles,
    groupAnd,
    groupOr,
    itemize,
    groupVerbs,
    includeDates,
    groupPrepositions,
  )(phrase));

  return groups;
};

module.exports = flow;
