const toLowerCase = require('../utils/toLowerCase');
const { getLast, withoutLast } = require('../utils/listUtils');

const map = [
  { from: ['1st'], to: ['first'] },
  { from: ['2nd'], to: ['second'] },
  { from: ['3rd'], to: ['third'] },
  { from: ['a', 'handful', 'of'], to: ['handful'] },
  { from: ['a', 'number', 'of'], to: ['number'] },
  { from: ['at', 'least'], to: ['above'] },
  { from: ['beginning', 'on'], to: ['since'] },
  { from: ['et', 'al.'], to: [',', 'and', 'others'] },
  { from: ['more', 'than'], to: ['above'] },
  { from: ['such', 'as'], to: [':'] },
  { from: ['the', 'handful', 'of'], to: ['handful'] },
  { from: ['the', 'number', 'of'], to: ['the', 'amount', 'of'] },
  { from: ['well', 'over'], to: ['above'] },
];

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
