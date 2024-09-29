const _ = require('lodash');
const { withoutLastOne } = require('../utils/listUtils');

const convertManyDecades = phrase => phrase.reduce(
  (accumulator, current) => {
    if (
      _.get(current, 'groupType') === 'and'
      && current.members[0].minYear
      && current.members[1].maxYear
    ) {
      return [
        ...withoutLastOne(accumulator),
        'in',
        {
          ...current.members[0],
          maxYear: current.members[1].maxYear,
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertManyDecades;
