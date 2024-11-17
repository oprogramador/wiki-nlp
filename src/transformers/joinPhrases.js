const _ = require('lodash');
const { withoutLastOne } = require('../utils/listUtils');

const joinPhrases = phrases => phrases
  .reduce((accumulator, current) => {
    const last = _.last(accumulator);
    if (last && current[0] && /^[a-z]/.test(current[0])) {
      return [
        ...withoutLastOne(accumulator),
        [
          ...withoutLastOne(last),
          `${_.last(last)}.`,
          ...current,
        ],
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = joinPhrases;
