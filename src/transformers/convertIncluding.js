const _ = require('lodash');
const { getBeforeLast, withoutLast } = require('../utils/listUtils');

const convertIncluding = phrase => phrase.reduce(
  (accumulator, current) => {
    const beforeLast = getBeforeLast(accumulator);
    const last = _.last(accumulator);

    if (
      beforeLast === ','
      && last === 'including'
    ) {
      return [
        ...withoutLast(accumulator, 2),
        {
          groupType: 'including',
          what: current,
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertIncluding;
