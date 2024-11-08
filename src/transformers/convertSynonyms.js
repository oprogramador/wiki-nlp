const _ = require('lodash');
const toLowerCase = require('../utils/toLowerCase');
const { getLast, withoutLast } = require('../utils/listUtils');

const map = _.sortBy([
  { from: [',', 'out', 'of', 'a', 'population', 'of'], to: ['out', 'of'] },
  { from: ['1st'], to: ['first'] },
  { from: ['2nd'], to: ['second'] },
  { from: ['3rd'], to: ['third'] },
  { from: ['a', 'handful', 'of'], to: ['handful'] },
  { from: ['a', 'number', 'of'], to: ['number'] },
  { from: ['an', 'estimated'], to: ['around'] },
  { from: ['as', 'many', 'as'], to: [] },
  { from: ['as', 'of'], to: ['in'] },
  { from: ['as', 'recently', 'as'], to: [] },
  { from: ['at', 'least'], to: ['above'] },
  { from: ['beginning', 'on'], to: ['since'] },
  { from: ['et', 'al.'], to: [',', 'and', 'others'] },
  { from: ['little', 'more', 'than'], to: ['above'] },
  { from: ['quite', 'a', 'long', 'time', 'ago'], to: ['over', '200', 'years', 'ago'] },
  { from: ['a', 'long', 'time', 'ago'], to: ['over', '100', 'years', 'ago'] },
  { from: ['not', 'a', 'long', 'time', 'ago'], to: ['below', '100', 'years', 'ago'] },
  { from: ['more', 'than'], to: ['above'] },
  { from: ['no', 'more', 'than'], to: ['almost'] },
  { from: ['out', 'of', 'a', 'population', 'of'], to: ['out', 'of'] },
  { from: ['such', 'as'], to: [':'] },
  { from: ['the', 'handful', 'of'], to: ['handful'] },
  { from: ['the', 'number', 'of'], to: ['the', 'amount', 'of'] },
  { from: ['the', 'second', 'half', 'of', 'the'], to: ['the', 'late'] },
  { from: ['well', 'over'], to: ['above'] },
], x => -x.from.length);

const convertSynonyms = ({ now } = {}) => phrase => phrase
  .reduce((accumulator, current) => {
    const mapBasedOnTime = [
      { from: ['recent', 'years'], to: [`${now.getFullYear() - 15}–${now.getFullYear()}`] },
      { from: ['recent', 'decades'], to: [`${now.getFullYear() - 40}–${now.getFullYear()}`] },
    ];

    const found = [...map, ...mapBasedOnTime].find(e => JSON.stringify(
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
  []);

module.exports = convertSynonyms;
