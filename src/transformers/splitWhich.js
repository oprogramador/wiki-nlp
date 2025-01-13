const _ = require('lodash');
const { withoutLastOne } = require('../utils/listUtils');

const splitWhich = phrase => phrase
  .reduce((accumulator, current) => {
    const lastPhrase = _.last(accumulator) || [];
    const last = _.last(lastPhrase) || {};
    if (last === ',' && current === 'which') {
      return [
        ...withoutLastOne(accumulator),
        withoutLastOne(lastPhrase),
        ['it-object'],
      ];
    }

    return [
      ...withoutLastOne(accumulator),
      [
        ...lastPhrase,
        current,
      ],
    ];
  },
  []);

module.exports = splitWhich;
