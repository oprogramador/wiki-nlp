const toLowerCase = require('../utils/toLowerCase');
const { getLast, withoutLast } = require('../utils/listUtils');

const map = [
  { from: ['1st'], to: ['first'] },
  { from: ['2nd'], to: ['second'] },
  { from: ['3rd'], to: ['third'] },
  { from: ['beginning', 'on'], to: ['since'] },
  { from: ['at', 'least'], to: ['above'] },
  { from: ['more', 'than'], to: ['above'] },
  { from: ['well', 'over'], to: ['above'] },
  { from: ['et', 'al.'], to: [',', 'and', 'others'] },
  { from: ['a', 'handful', 'of'], to: ['handful'] },
  { from: ['a', 'number', 'of'], to: ['number'] },
  { from: ['the', 'handful', 'of'], to: ['handful'] },
  { from: ['the', 'number', 'of'], to: ['the', 'amount', 'of'] },
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
