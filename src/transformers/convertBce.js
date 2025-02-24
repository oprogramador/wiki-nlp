const _ = require('lodash');
const { withoutLastOne } = require('../utils/listUtils');

const convertBce = phrase => phrase.reduce(
  (accumulator, current) => {
    const last = _.last(accumulator);

    if (current.groupType === 'BCE') {
      const range = last.isFromPartialMid
        ? (last.maxYear - last.minYear + 1) / 3 - 1
        : last.maxYear - last.minYear;
      const offset = (
        Math.log10(range + 1) % 1 === 0
        || last.isFromManyCenturies
        || last.isFromMid
      )
        ? 0
        : (range + 1) * (last.maxYear % (range * 2 + 2) === 0 ? 1 : -1);

      return [
        ...withoutLastOne(accumulator),
        {
          ...last,
          max: -last.max,
          maxYear: -last.minYear + offset,
          min: -last.min,
          minYear: -last.maxYear + offset,
          value: -last.value,
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertBce;
