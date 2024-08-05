const toLowerCase = require('./toLowerCase');
const { getLast, withoutLast } = require('./listUtils');

const map = [
  { from: ['beginning', 'on'], to: ['since'] },
  { from: ['at', 'least'], to: ['above'] },
  { from: ['more', 'than'], to: ['above'] },
  { from: ['well', 'over'], to: ['above'] },
  { from: ['et', 'al.'], to: [',', 'and', 'others'] },
  { from: ['a', 'handful', 'of'], to: ['handful'] },
  { from: ['a', 'number', 'of'], to: ['number'] },
  { from: ['the', 'handful', 'of'], to: ['handful'] },
];

const convertSynonyms = phrase => phrase
  .reduce((accumulator, current) => {
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
  []);

module.exports = convertSynonyms;
