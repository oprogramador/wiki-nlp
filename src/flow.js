const _ = require('lodash');
const addCommas = require('./addCommas');
const convertBn = require('./convertBn');
const convertDateRanges = require('./convertDateRanges');
const convertDecades = require('./convertDecades');
const convertFractions = require('./convertFractions');
const convertNumbers = require('./convertNumbers');
const convertPercent = require('./convertPercent');
const convertPunctuation = require('./convertPunctuation');
const convertSynonyms = require('./convertSynonyms');
const groupAnd = require('./groupAnd');
const groupArticles = require('./groupArticles');
const groupBrackets = require('./groupBrackets');
const groupDates = require('./groupDates');
const groupLocality = require('./groupLocality');
const groupNumbered = require('./groupNumbered');
const groupNumbers = require('./groupNumbers');
const groupOr = require('./groupOr');
const groupPrepositions = require('./groupPrepositions');
const groupUnits = require('./groupUnits');
const groupVerbs = require('./groupVerbs');
const includeDates = require('./includeDates');
const includeDatesFromAnd = require('./includeDatesFromAnd');
const includeLocalities = require('./includeLocalities');
const itemize = require('./itemize');
const removeMeaningless = require('./removeMeaningless');

const flow = (phrases, { now } = { now: new Date() }) => {
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
    convertFractions,
    groupArticles,
    convertDecades,
    groupBrackets,
    groupLocality,
    groupAnd,
    groupOr,
    groupUnits,
    itemize,
    groupNumbered,
    groupAnd,
    convertDateRanges,
    groupVerbs,
    includeLocalities,
    includeDates({ now }),
    includeDatesFromAnd({ now }),
    groupPrepositions,
  )(phrase));

  return groups;
};

module.exports = flow;
