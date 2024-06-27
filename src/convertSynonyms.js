const _ = require('lodash');
const toLowerCase = require('./toLowerCase');
const { withoutLastOne } = require('./listUtils');

const map = {
  [JSON.stringify(['beginning', 'on'])]: 'since',
  [JSON.stringify(['at', 'least'])]: 'above',
  [JSON.stringify(['more', 'than'])]: 'above',
  [JSON.stringify(['well', 'over'])]: 'above',
};

const convertSynonyms = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator);

    const key = JSON.stringify([toLowerCase(last), toLowerCase(current)]);
    const found = map[key];
    if (found) {
      return [
        ...withoutLastOne(accumulator),
        found,
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = convertSynonyms;
