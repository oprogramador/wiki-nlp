const _ = require('lodash');
const toLowerCase = require('../utils/toLowerCase');
const { getLast, withoutLast } = require('../utils/listUtils');

const convertNow = now => [
  'on',
  {
    day: now.getDate(),
    groupType: 'date',
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  },
];

const createDefaultMap = ({ now }) => [
  { from: ['&'], to: ['and'] },
  { from: [',', 'are'], to: ['are'] },
  { from: [',', 'excluding'], to: ['excluding'] },
  { from: [',', 'including'], to: ['including'] },
  { from: [',', 'known', 'as'], to: ['#alternative-name'] },
  { from: [',', 'on', 'the', 'other', 'hand', ','], to: [] },
  { from: [',', 'on', 'the', 'other', 'hand'], to: [] },
  { from: [',', 'out', 'of', 'a', 'population', 'of'], to: ['out', 'of'] },
  { from: ['1st'], to: ['first'] },
  { from: ['21st'], to: ['twenty-first'] },
  { from: ['2nd'], to: ['second'] },
  { from: ['3rd'], to: ['third'] },
  { from: ['a', 'few', 'hundred'], to: ['101–1000'] },
  { from: ['a', 'handful', 'of'], to: ['handful'] },
  { from: ['a', 'large', 'majority', 'of'], to: ['above', '60', '%', 'of'] },
  { from: ['a', 'long', 'time', 'ago'], to: ['over', '100', 'years', 'ago'] },
  { from: ['a', 'majority', 'of'], to: ['above', '50', '%', 'of'] },
  { from: ['a', 'number', 'of'], to: ['number'] },
  { from: ['a', 'total', 'of'], to: [] },
  { from: ['although'], to: ['but'] },
  { from: ['american', 'dollars'], to: ['USDs'] },
  { from: ['an', 'estimated'], to: ['around'] },
  { from: ['an', 'overwhelming', 'majority', 'of'], to: ['above', '75', '%', 'of'] },
  { from: ['and', 'are'], to: ['and', 'they', 'are'] },
  { from: ['and', 'had'], to: ['and', 'it', 'had'] },
  { from: ['and', 'has'], to: ['and', 'it', 'has'] },
  { from: ['and', 'is'], to: ['and', 'it', 'is'] },
  { from: ['and', 'was'], to: ['and', 'it', 'was'] },
  { from: ['and', 'were'], to: ['and', 'they', 'were'] },
  { from: ['as', 'many', 'as'], to: [] },
  { from: ['as', 'of'], to: ['in'] },
  { from: ['as', 'recently', 'as'], to: [] },
  { from: ['at', 'least'], to: ['above'] },
  { from: ['at', 'the', 'same', 'time'], to: ['at', 'the', 'same', 'time', ','] },
  { from: ['bc'], to: ['BCE'] },
  { from: ['beginning', 'on'], to: ['since'] },
  { from: ['billions', 'of'], to: ['above', 'one', 'billion'] },
  { from: ['but'], to: [',', 'but'] },
  { from: ['dozens', 'of', 'billions', 'of'], to: ['above', '1e10'] },
  { from: ['dozens', 'of', 'millions', 'of'], to: ['above', '1e7'] },
  { from: ['dozens', 'of', 'thousands', 'of'], to: ['above', '1e4'] },
  { from: ['dozens', 'of', 'trillions', 'of'], to: ['above', '1e13'] },
  { from: ['dozens', 'of'], to: ['above', '10'] },
  { from: ['et', 'al.'], to: [',', 'and', 'others'] },
  { from: ['every', 'other', 'day'], to: ['every', '2', 'days'] },
  { from: ['every', 'other', 'hour'], to: ['every', '2', 'hours'] },
  { from: ['every', 'other', 'month'], to: ['every', '2', 'months'] },
  { from: ['every', 'other', 'week'], to: ['every', '2', 'weeks'] },
  { from: ['every', 'other', 'year'], to: ['every', '2', 'years'] },
  { from: ['excluding', ':'], to: ['excluding'] },
  { from: ['had', 'been'], to: ['were'] },
  { from: ['has', 'been'], to: ['is'] },
  { from: ['has', 'often', 'been'], to: ['frequently', 'is'] },
  { from: ['hundreds', 'of', 'billions', 'of'], to: ['above', '1e11'] },
  { from: ['hundreds', 'of', 'millions', 'of'], to: ['above', '1e8'] },
  { from: ['hundreds', 'of', 'thousands', 'of'], to: ['above', '1e5'] },
  { from: ['hundreds', 'of', 'trillions', 'of'], to: ['above', '1e14'] },
  { from: ['hundreds', 'of'], to: ['above', '100'] },
  { from: ['in', 'every'], to: ['every'] },
  { from: ['including', ':'], to: ['including'] },
  { from: ['it', 'is', 'speculated', 'that'], to: ['likely'] },
  { from: ['little', 'more', 'than'], to: ['above'] },
  { from: ['majority', 'of'], to: ['above', '50', '%', 'of'] },
  { from: ['many', 'billions', 'of'], to: ['above', 'one', 'billion'] },
  { from: ['many', 'dozens', 'of'], to: ['above', '10'] },
  { from: ['many', 'hundreds', 'of', 'millions', 'of'], to: ['above', '1e8'] },
  { from: ['many', 'hundreds', 'of', 'thousands', 'of'], to: ['above', '1e5'] },
  { from: ['many', 'millions', 'of'], to: ['above', 'one', 'million'] },
  { from: ['many', 'thousands', 'of'], to: ['above', '1000'] },
  { from: ['many', 'trillions', 'of'], to: ['above', 'one', 'trillion'] },
  { from: ['millions', 'of'], to: ['above', 'one', 'million'] },
  { from: ['more', 'than'], to: ['above'] },
  { from: ['most', 'of'], to: ['above', '50', '%', 'of'] },
  { from: ['no', 'more', 'than'], to: ['almost'] },
  { from: ['not', 'a', 'long', 'time', 'ago'], to: ['below', '100', 'years', 'ago'] },
  { from: ['not', 'excluding'], to: ['including'] },
  { from: ['not', 'including'], to: ['excluding'] },
  { from: ['now'], to: convertNow(now) },
  { from: ['nowadays'], to: convertNow(now) },
  { from: ['on', 'average'], to: ['typically'] },
  { from: ['on', 'the', 'other', 'hand', ','], to: [] },
  { from: ['on', 'the', 'other', 'hand'], to: [] },
  { from: ['once'], to: ['1', 'times'] },
  { from: ['out', 'of', 'a', 'population', 'of'], to: ['out', 'of'] },
  { from: ['quite', 'a', 'long', 'time', 'ago'], to: ['over', '200', 'years', 'ago'] },
  { from: ['recent', 'decades'], to: [`${now.getFullYear() - 40}–${now.getFullYear()}`] },
  { from: ['recent', 'years'], to: [`${now.getFullYear() - 15}–${now.getFullYear()}`] },
  { from: ['several', 'hundred'], to: ['101–1000'] },
  { from: ['starting', 'from'], to: ['since'] },
  { from: ['starting'], to: ['since'] },
  { from: ['such', 'as'], to: [':'] },
  { from: ['the', 'handful', 'of'], to: ['handful'] },
  { from: ['the', 'large', 'majority', 'of'], to: ['above', '60', '%', 'of'] },
  { from: ['the', 'majority', 'of'], to: ['above', '50', '%', 'of'] },
  { from: ['the', 'number', 'of'], to: ['the', 'amount', 'of'] },
  { from: ['the', 'overwhelming', 'majority', 'of'], to: ['above', '75', '%', 'of'] },
  { from: ['the', 'second', 'half', 'of', 'the'], to: ['the', 'late'] },
  { from: ['though'], to: ['but'] },
  { from: ['thousands', 'of'], to: ['above', '1000'] },
  { from: ['thrice'], to: ['3', 'times'] },
  { from: ['today'], to: convertNow(now) },
  { from: ['trillions', 'of'], to: ['above', 'one', 'trillion'] },
  { from: ['twice'], to: ['2', 'times'] },
  { from: ['u.s.', 'dollars'], to: ['USDs'] },
  { from: ['united', 'states', 'dollars'], to: ['USDs'] },
  { from: ['until'], to: ['by'] },
  { from: ['us', 'dollars'], to: ['USDs'] },
  { from: ['well', 'over'], to: ['above'] },
  { from: ['which'], to: [',', 'which'] },
  { from: ['whole', 'hundreds', 'of'], to: ['above', '100'] },
];

const convertSynonyms = ({ now, createMap = createDefaultMap } = {}) => (phrase) => {
  const maps = _.sortBy(
    Object.entries(
      _.groupBy(createMap({ now }), x => x.from.length),
    ),
    ([key]) => -Number(key),
  )
    .map(([, value]) => value);

  const converters = maps.map(map => currentPhrase => currentPhrase.reduce((accumulator, current) => {
    const found = map.find(e => JSON.stringify(
      getLast(
        [...accumulator, current].map(toLowerCase),
        e.from.length,
      ),
    ) === JSON.stringify(e.from));
    if (found) {
      return [
        ...withoutLast(accumulator, found.from.length - 1),
        ...found.to,
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []));

  return _.flow(converters)(phrase);
};

module.exports = convertSynonyms;
