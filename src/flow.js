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
const splitWhich = require('./splitWhich');

const flow = (phrases, { now } = { now: new Date() }) => {
  const groups = _.flow(
    p => p.map(convertPunctuation),
    p => p.map(removeMeaningless),
    p => p.map(addCommas),
    p => p.map(groupDates),
    p => p.map(convertPercent),
    p => p.map(convertBn),
    p => p.map(convertSynonyms),
    p => p.map(groupNumbers),
    p => p.map(convertNumbers),
    p => p.map(convertFractions),
    p => p.map(groupArticles),
    p => p.map(convertDecades),
    p => p.map(groupBrackets),
    p => p.map(groupLocality),
    p => p.map(pp => groupAnd(pp)),
    p => p.map(groupOr),
    p => p.map(groupUnits),
    p => p.map(itemize),
    p => p.map(groupNumbered),
    p => p.map(pp => groupAnd(pp)),
    p => p.map(pp => splitWhich(pp)).flat(),
    p => p.map(convertDateRanges),
    p => p.map(groupVerbs),
    p => p.map(includeLocalities),
    p => p.map(includeDates({ now })),
    p => p.map(includeDatesFromAnd({ now })),
    p => p.map(groupPrepositions),
  )(phrases);

  return groups;
};

module.exports = flow;
