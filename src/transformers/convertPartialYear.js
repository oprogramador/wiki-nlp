const _ = require('lodash');
const { withoutLastOne } = require('../utils/listUtils');

const map = {
  early: {
    maxMonth: 6,
    minMonth: 1,
  },
  late: {
    maxMonth: 12,
    minMonth: 7,
  },
};

const convertPartialYear = phrase => phrase.reduce(
  (accumulator, current) => {
    const last = _.last(accumulator);

    if (map[last] && _.get(current, 'groupType') === 'quantity') {
      return [
        ...withoutLastOne(accumulator),
        {
          ...map[last],
          groupType: 'date',
          year: current.value,
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertPartialYear;
