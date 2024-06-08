const _ = require('lodash');

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
        ...accumulator.slice(0, -1),
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
