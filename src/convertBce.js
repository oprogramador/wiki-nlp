const _ = require('lodash');
const { withoutLastOne } = require('./listUtils');

const convertBce = phrase => phrase.reduce(
  (accumulator, current) => {
    const last = _.last(accumulator);

    if (current.groupType === 'BCE') {
      return [
        ...withoutLastOne(accumulator),
        {
          ...last,
          max: -last.max,
          maxYear: -last.minYear,
          min: -last.min,
          minYear: -last.maxYear,
          value: -last.value,
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertBce;
