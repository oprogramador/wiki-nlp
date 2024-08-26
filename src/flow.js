const _ = require('lodash');
const addCommas = require('./addCommas');
const convertArticlesToLowerCase = require('./convertArticlesToLowerCase');
const convertBn = require('./convertBn');
const convertBoth = require('./convertBoth');
const convertDateRanges = require('./convertDateRanges');
const convertDecades = require('./convertDecades');
const convertFractions = require('./convertFractions');
const convertFromTo = require('./convertFromTo');
const convertFromToInPhrase = require('./convertFromToInPhrase');
const convertNumbers = require('./convertNumbers');
const convertOrdinals = require('./convertOrdinals');
const convertPassive = require('./convertPassive');
const convertPercent = require('./convertPercent');
const convertPronouns = require('./convertPronouns');
const convertPunctuation = require('./convertPunctuation');
const convertRespectively = require('./convertRespectively');
const convertSynonyms = require('./convertSynonyms');
const flatArticles = require('./flatArticles');
const groupAnd = require('./groupAnd');
const groupArticles = require('./groupArticles');
const groupBrackets = require('./groupBrackets');
const groupDates = require('./groupDates');
const groupLocality = require('./groupLocality');
const groupNumbered = require('./groupNumbered');
const groupNumbers = require('./groupNumbers');
const groupOr = require('./groupOr');
const groupPrenumbered = require('./groupPrenumbered');
const groupPrepositions = require('./groupPrepositions');
const groupUnits = require('./groupUnits');
const groupVerbs = require('./groupVerbs');
const includeAccordance = require('./includeAccordance');
const includeDates = require('./includeDates');
const includeDatesFromAnd = require('./includeDatesFromAnd');
const includeLocalities = require('./includeLocalities');
const itemize = require('./itemize');
const removeMeaningless = require('./removeMeaningless');
const skipArticleBeforeNumber = require('./skipArticleBeforeNumber');
const splitBut = require('./splitBut');
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
    p => p.map(convertArticlesToLowerCase),
    p => p.map(convertDecades),
    p => p.map(groupBrackets),
    p => p.map(convertFromTo),
    p => p.map(groupLocality),
    p => p.map(pp => groupAnd(pp)),
    p => p.map(convertOrdinals),
    p => p.map(groupOr),
    p => p.map(groupUnits),
    p => p.map(groupPrenumbered),
    p => p.map(itemize),
    p => p.map(skipArticleBeforeNumber),
    p => p.map(groupNumbered),
    p => p.map(pp => groupAnd(pp)),
    p => p.map(convertBoth),
    p => p.map(flatArticles),
    p => p.map(pp => splitWhich(pp)).flat(),
    p => p.map(pp => splitBut(pp)).flat(),
    p => p.map(convertDateRanges),
    p => p.map(groupVerbs),
    p => p.map(convertRespectively),
    p => p.map(convertFromToInPhrase),
    p => p.map(includeAccordance),
    p => p.map(includeLocalities),
    p => p.map(includeDates({ now })),
    p => p.map(includeDatesFromAnd({ now })),
    p => p.map(groupPrepositions),
    p => p.map(convertPassive),
    p => p.map((current, i) => convertPronouns(current, p[i - 1])),
  )(phrases);

  return groups;
};

module.exports = flow;
