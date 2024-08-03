const toLowerCase = require('./toLowerCase');
const { getLast, withoutLast } = require('./listUtils');

const map = {
  [JSON.stringify(['beginning', 'on'])]: ['since'],
  [JSON.stringify(['at', 'least'])]: ['above'],
  [JSON.stringify(['more', 'than'])]: ['above'],
  [JSON.stringify(['well', 'over'])]: ['above'],
  [JSON.stringify(['et', 'al.'])]: [',', 'and', 'others'],
  [JSON.stringify(['a', 'handful', 'of'])]: ['handful'],
  [JSON.stringify(['the', 'handful', 'of'])]: ['handful'],
};

const convertSynonyms = phrase => phrase
  .reduce((accumulator, current) => {
    const key = Object.keys(map)
      .find(k => JSON.stringify(getLast([...accumulator, current].map(toLowerCase), JSON.parse(k).length)) === k);
    const found = map[key];
    if (found) {
      return [
        ...withoutLast(accumulator, JSON.parse(key).length - 1),
        ...found,
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = convertSynonyms;
