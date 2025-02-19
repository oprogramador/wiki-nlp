const _ = require('lodash');
const { withoutLastOne } = require('../utils/listUtils');

const convertBce = phrase => phrase.reduce(
  (accumulator, current) => {
    const last = _.last(accumulator);

    if (current.groupType === 'BCE') {
      const range = last.maxYear - last.minYear;
      const offset = range.toString()[0] !== '4' ? 0 : (range + 1) * (last.maxYear % (range * 2 + 2) === 0 ? -1 : 1);

      return [
        ...withoutLastOne(accumulator),
        {
          ...last,
          max: -last.max,
          maxYear: -last.minYear - offset,
          min: -last.min,
          minYear: -last.maxYear - offset,
          value: -last.value,
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertBce;
