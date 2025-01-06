const _ = require('lodash');
const addArticleToDecade = require('./transformers/addArticleToDecade');
const addCommas = require('./transformers/addCommas');
const convertAbbreviations = require('./transformers/convertAbbreviations');
const convertAdverbs = require('./transformers/convertAdverbs');
const convertAgo = require('./transformers/convertAgo');
const convertArticlesToLowerCase = require('./transformers/convertArticlesToLowerCase');
const convertBce = require('./transformers/convertBce');
const convertBetween = require('./transformers/convertBetween');
const convertBn = require('./transformers/convertBn');
const convertBoth = require('./transformers/convertBoth');
const convertCenturies = require('./transformers/convertCenturies');
const convertColon = require('./transformers/convertColon');
const convertCurrencies = require('./transformers/convertCurrencies');
const convertDateRanges = require('./transformers/convertDateRanges');
const convertDecades = require('./transformers/convertDecades');
const convertDidNot = require('./transformers/convertDidNot');
const convertFractions = require('./transformers/convertFractions');
const convertFromTo = require('./transformers/convertFromTo');
const convertFromToInPhrase = require('./transformers/convertFromToInPhrase');
const convertIncluding = require('./transformers/convertIncluding');
const convertManyCenturies = require('./transformers/convertManyCenturies');
const convertManyDecades = require('./transformers/convertManyDecades');
const convertMixedOrdinalsSimple = require('./transformers/convertMixedOrdinalsSimple');
const convertMixedOrdinalsWithDash = require('./transformers/convertMixedOrdinalsWithDash');
const convertNeither = require('./transformers/convertNeither');
const convertNumbers = require('./transformers/convertNumbers');
const convertOrMore = require('./transformers/convertOrMore');
const convertOrdinals = require('./transformers/convertOrdinals');
const convertOutOf = require('./transformers/convertOutOf');
const convertPassive = require('./transformers/convertPassive');
const convertPercent = require('./transformers/convertPercent');
const convertSelf = require('./transformers/convertSelf');
const convertPreAdverbs = require('./transformers/convertPreAdverbs');
const convertPreBce = require('./transformers/convertPreBce');
const convertPronouns = require('./transformers/convertPronouns');
const convertPunctuation = require('./transformers/convertPunctuation');
const convertRespectively = require('./transformers/convertRespectively');
const convertSynonyms = require('./transformers/convertSynonyms');
const flatArticles = require('./transformers/flatArticles');
const groupAnd = require('./transformers/groupAnd');
const groupArticles = require('./transformers/groupArticles');
const groupBrackets = require('./transformers/groupBrackets');
const groupDates = require('./transformers/groupDates');
const groupLocality = require('./transformers/groupLocality');
const groupNor = require('./transformers/groupNor');
const groupNumbered = require('./transformers/groupNumbered');
const groupNumbers = require('./transformers/groupNumbers');
const groupOr = require('./transformers/groupOr');
const groupPrenumbered = require('./transformers/groupPrenumbered');
const groupPrepositions = require('./transformers/groupPrepositions');
const groupUnits = require('./transformers/groupUnits');
const groupVerbs = require('./transformers/groupVerbs');
const includeAccordance = require('./transformers/includeAccordance');
const includeDates = require('./transformers/includeDates');
const includeDatesFromAnd = require('./transformers/includeDatesFromAnd');
const includeLocalities = require('./transformers/includeLocalities');
const includeRelativeDates = require('./transformers/includeRelativeDates');
const includeSimpleLocalities = require('./transformers/includeSimpleLocalities');
const includeTimes = require('./transformers/includeTimes');
const itemize = require('./transformers/itemize');
const joinPhrases = require('./transformers/joinPhrases');
const moveAdverbs = require('./transformers/moveAdverbs');
const removeMeaningless = require('./transformers/removeMeaningless');
const skipArticleBeforeNumber = require('./transformers/skipArticleBeforeNumber');
const splitAndIt = require('./transformers/splitAndIt');
const splitBut = require('./transformers/splitBut');
const splitBySemicolon = require('./transformers/splitBySemicolon');
const splitWhich = require('./transformers/splitWhich');

const flow = (phrases, { now } = { now: new Date() }) => {
  const groups = _.flow(
    p => p.map(pp => splitBySemicolon(pp)).flat(),
    joinPhrases,
    p => p.map(convertPunctuation),
    p => p.map(removeMeaningless),
    p => p.map(convertSynonyms({ now })),
    p => p.map(convertSynonyms({ createMap: () => [{ from: [',', ','], to: [','] }] })),
    p => p.map(addCommas),
    p => p.map(groupDates),
    p => p.map(convertPercent),
    p => p.map(convertBn),
    p => p.map(convertAbbreviations),
    p => p.map(convertMixedOrdinalsSimple),
    p => p.map(convertMixedOrdinalsWithDash),
    p => p.map(convertBetween),
    p => p.map(groupNumbers),
    p => p.map(convertNumbers),
    p => p.map(convertFractions),
    p => p.map(convertOrMore),
    p => p.map(convertAgo({ now })),
    p => p.map(convertPreBce),
    p => p.map(moveAdverbs),
    p => p.map(groupArticles),
    p => p.map(convertSelf),
    p => p.map(convertArticlesToLowerCase),
    p => p.map(addArticleToDecade),
    p => p.map(convertDecades),
    p => p.map(convertCenturies),
    p => p.map(convertManyCenturies),
    p => p.map(convertBce),
    p => p.map(groupBrackets),
    p => p.map(convertFromTo),
    p => p.map(groupLocality),
    p => p.map(pp => splitAndIt(pp)).flat(),
    p => p.map(pp => groupAnd(pp)),
    p => p.map(convertManyDecades),
    p => p.map(convertOrdinals),
    p => p.map(convertColon),
    p => p.map(groupOr),
    p => p.map(groupNor),
    p => p.map(groupUnits),
    p => p.map(groupPrenumbered),
    p => p.map(itemize),
    p => p.map((current, i) => includeRelativeDates(current, p[i - 1])),
    p => p.map(convertIncluding({ separator: 'including' })),
    p => p.map(convertIncluding({ separator: 'excluding' })),
    p => p.map(convertCurrencies),
    p => p.map(convertOutOf),
    p => p.map(skipArticleBeforeNumber),
    p => p.map(groupNumbered),
    p => p.map(pp => groupAnd(pp)),
    p => p.map(convertBoth),
    p => p.map(convertNeither),
    p => p.map(flatArticles),
    p => p.map(pp => splitWhich(pp)).flat(),
    p => p.map(pp => splitBut(pp)).flat(),
    p => p.map(convertDateRanges),
    p => p.map(convertPreAdverbs),
    p => p.map(convertDidNot),
    p => p.map(groupVerbs),
    p => p.map(convertAdverbs),
    p => p.map(pp => convertRespectively(pp)).flat(),
    p => p.map(convertFromToInPhrase),
    p => p.map(includeAccordance),
    p => p.map(includeLocalities),
    p => p.map(includeSimpleLocalities),
    p => p.map(includeTimes),
    p => p.map(includeDates({ now })),
    p => p.map(includeDatesFromAnd({ now })),
    p => p.map(groupPrepositions),
    p => p.map(convertPassive),
    p => p.map((current, i) => convertPronouns(current, p[i - 1])),
  )(phrases);

  return groups;
};

module.exports = flow;
