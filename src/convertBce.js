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
          maxYear: -last.minYear,
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
