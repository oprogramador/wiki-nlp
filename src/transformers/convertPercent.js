const _ = require('lodash');
const { withoutLastOne } = require('../utils/listUtils');

const convertPercent = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator);

    if (current === 'percent') {
      return [
        ...accumulator,
        '%',
      ];
    }
    if (last === 'per' && current === 'cent') {
      return [
        ...withoutLastOne(accumulator),
        '%',
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = convertPercent;
