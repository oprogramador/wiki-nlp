const _ = require('lodash');
const { withoutLastOne } = require('./listUtils');

const splitWhich = phrase => phrase
  .reduce((accumulator, current) => {
    const lastPhrase = _.last(accumulator) || [];
    const last = _.last(lastPhrase) || {};
    if (last === ',' && current === 'which') {
      return [
        ...withoutLastOne(accumulator),
        withoutLastOne(lastPhrase),
        ['it'],
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
