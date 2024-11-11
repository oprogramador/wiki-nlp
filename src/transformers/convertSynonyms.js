const _ = require('lodash');
const toLowerCase = require('../utils/toLowerCase');
const { getLast, withoutLast } = require('../utils/listUtils');

const createMap = ({ now }) => [
  { from: [',', 'out', 'of', 'a', 'population', 'of'], to: ['out', 'of'] },
  { from: ['1st'], to: ['first'] },
  { from: ['2nd'], to: ['second'] },
  { from: ['3rd'], to: ['third'] },
  { from: ['a', 'handful', 'of'], to: ['handful'] },
  { from: ['a', 'long', 'time', 'ago'], to: ['over', '100', 'years', 'ago'] },
  { from: ['a', 'number', 'of'], to: ['number'] },
  { from: ['an', 'estimated'], to: ['around'] },
  { from: ['as', 'many', 'as'], to: [] },
  { from: ['as', 'of'], to: ['in'] },
  { from: ['as', 'recently', 'as'], to: [] },
  { from: ['at', 'least'], to: ['above'] },
  { from: ['beginning', 'on'], to: ['since'] },
  { from: ['billions', 'of'], to: ['above', 'one', 'billion'] },
  { from: ['dozens', 'of'], to: ['above', '10'] },
  { from: ['et', 'al.'], to: [',', 'and', 'others'] },
  { from: ['hundreds', 'of', 'thousands', 'of'], to: ['above', '100000'] },
  { from: ['hundreds', 'of'], to: ['above', '100'] },
  { from: ['little', 'more', 'than'], to: ['above'] },
  { from: ['millions', 'of'], to: ['above', 'one', 'million'] },
  { from: ['more', 'than'], to: ['above'] },
  { from: ['no', 'more', 'than'], to: ['almost'] },
  { from: ['not', 'a', 'long', 'time', 'ago'], to: ['below', '100', 'years', 'ago'] },
  { from: ['out', 'of', 'a', 'population', 'of'], to: ['out', 'of'] },
  { from: ['quite', 'a', 'long', 'time', 'ago'], to: ['over', '200', 'years', 'ago'] },
  { from: ['recent', 'decades'], to: [`${now.getFullYear() - 40}–${now.getFullYear()}`] },
  { from: ['recent', 'years'], to: [`${now.getFullYear() - 15}–${now.getFullYear()}`] },
  { from: ['such', 'as'], to: [':'] },
  { from: ['the', 'handful', 'of'], to: ['handful'] },
  { from: ['the', 'number', 'of'], to: ['the', 'amount', 'of'] },
  { from: ['the', 'second', 'half', 'of', 'the'], to: ['the', 'late'] },
  { from: ['thousands', 'of'], to: ['above', '1000'] },
  { from: ['well', 'over'], to: ['above'] },
];

const convertSynonyms = ({ now } = {}) => (phrase) => {
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
