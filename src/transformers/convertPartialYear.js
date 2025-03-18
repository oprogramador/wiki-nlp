const _ = require('lodash');
const { withoutLastOne } = require('../utils/listUtils');

const convertPartialYear = phrase => phrase.reduce(
  (accumulator, current) => {
    const last = _.last(accumulator);

    if (last === 'early' && _.get(current, 'groupType') === 'quantity') {
      return [
        ...withoutLastOne(accumulator),
        {
          groupType: 'date',
          maxMonth: 6,
          minMonth: 1,
          year: current.value,
        },
      ];
    }
    if (last === 'late' && _.get(current, 'groupType') === 'quantity') {
      return [
        ...withoutLastOne(accumulator),
        {
          groupType: 'date',
          maxMonth: 12,
          minMonth: 7,
          year: current.value,
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertPartialYear;
