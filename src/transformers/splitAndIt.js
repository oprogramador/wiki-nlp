const _ = require('lodash');
const {
  getBeforeLast,
  withoutLast,
  withoutLastOne,
} = require('../utils/listUtils');
const pronouns = require('../utils/pronounsList');

const splitAndIt = phrase => phrase
  .reduce((accumulator, current) => {
    const lastPhrase = _.last(accumulator) || [];
    const beforeLast = getBeforeLast(lastPhrase);
    const last = _.last(lastPhrase) || {};

    if (
      beforeLast === ','
      && last === 'and'
      && pronouns.includes(current)
    ) {
      return [
        ...withoutLastOne(accumulator),
        withoutLast(lastPhrase, 2),
        [current],
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

module.exports = splitAndIt;
