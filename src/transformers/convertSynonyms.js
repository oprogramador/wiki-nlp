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
  ',',
];

const createDefaultMap = ({ now }) => [
  { from: ['&'], to: ['and'] },
  { from: [',', 'out', 'of', 'a', 'population', 'of'], to: ['out', 'of'] },
  { from: ['1st'], to: ['first'] },
  { from: ['21st'], to: ['twenty-first'] },
  { from: ['2nd'], to: ['second'] },
  { from: ['3rd'], to: ['third'] },
  { from: ['a', 'few', 'hundred'], to: ['101–1000'] },
  { from: ['a', 'handful', 'of'], to: ['handful'] },
  { from: ['a', 'long', 'time', 'ago'], to: ['over', '100', 'years', 'ago'] },
  { from: ['a', 'number', 'of'], to: ['number'] },
  { from: ['a', 'total', 'of'], to: [] },
  { from: ['although'], to: ['but'] },
  { from: ['american', 'dollars'], to: ['USDs'] },
  { from: ['an', 'estimated'], to: ['around'] },
  { from: ['as', 'many', 'as'], to: [] },
  { from: ['as', 'of'], to: ['in'] },
  { from: ['as', 'recently', 'as'], to: [] },
  { from: ['at', 'least'], to: ['above'] },
  { from: ['at', 'the', 'same', 'time'], to: ['at', 'the', 'same', 'time', ','] },
  { from: ['beginning', 'on'], to: ['since'] },
  { from: ['billions', 'of'], to: ['above', 'one', 'billion'] },
  { from: ['dozens', 'of', 'billions', 'of'], to: ['above', '1e10'] },
  { from: ['dozens', 'of', 'millions', 'of'], to: ['above', '1e7'] },
  { from: ['dozens', 'of', 'thousands', 'of'], to: ['above', '1e4'] },
  { from: ['dozens', 'of', 'trillions', 'of'], to: ['above', '1e13'] },
  { from: ['dozens', 'of'], to: ['above', '10'] },
  { from: ['et', 'al.'], to: [',', 'and', 'others'] },
  { from: ['excluding', ':'], to: ['excluding'] },
  { from: ['had', 'been'], to: ['were'] },
  { from: ['has', 'been'], to: ['is'] },
  { from: ['hundreds', 'of', 'billions', 'of'], to: ['above', '1e11'] },
  { from: ['hundreds', 'of', 'millions', 'of'], to: ['above', '1e8'] },
  { from: ['hundreds', 'of', 'thousands', 'of'], to: ['above', '1e5'] },
  { from: ['hundreds', 'of', 'trillions', 'of'], to: ['above', '1e14'] },
  { from: ['hundreds', 'of'], to: ['above', '100'] },
  { from: ['including', ':'], to: ['including'] },
  { from: ['little', 'more', 'than'], to: ['above'] },
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
  { from: ['once'], to: ['1', 'times'] },
  { from: ['out', 'of', 'a', 'population', 'of'], to: ['out', 'of'] },
  { from: ['quite', 'a', 'long', 'time', 'ago'], to: ['over', '200', 'years', 'ago'] },
  { from: ['recent', 'decades'], to: [`${now.getFullYear() - 40}–${now.getFullYear()}`] },
  { from: ['recent', 'years'], to: [`${now.getFullYear() - 15}–${now.getFullYear()}`] },
  { from: ['several', 'hundred'], to: ['101–1000'] },
  { from: ['such', 'as'], to: [':'] },
  { from: ['the', 'handful', 'of'], to: ['handful'] },
  { from: ['the', 'number', 'of'], to: ['the', 'amount', 'of'] },
  { from: ['the', 'second', 'half', 'of', 'the'], to: ['the', 'late'] },
  { from: ['though'], to: ['but'] },
  { from: ['thousands', 'of'], to: ['above', '1000'] },
  { from: ['thrice'], to: ['3', 'times'] },
  { from: ['trillions', 'of'], to: ['above', 'one', 'trillion'] },
  { from: ['twice'], to: ['2', 'times'] },
  { from: ['u.s.', 'dollars'], to: ['USDs'] },
  { from: ['united', 'states', 'dollars'], to: ['USDs'] },
  { from: ['us', 'dollars'], to: ['USDs'] },
  { from: ['well', 'over'], to: ['above'] },
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
