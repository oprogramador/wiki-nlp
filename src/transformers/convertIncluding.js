const _ = require('lodash');
const { getBeforeLast, withoutLast } = require('../utils/listUtils');

const convertIncluding = ({ separator }) => phrase => phrase.reduce(
  (accumulator, current) => {
    const beforeLast = getBeforeLast(accumulator);
    const last = _.last(accumulator);

    if (
      beforeLast === ','
      && last === separator
    ) {
      return [
        ...withoutLast(accumulator, 2),
        {
          groupType: separator,
          what: current,
        },
      ];
    }

    if (
      last === separator
    ) {
      return [
        ...withoutLast(accumulator, 2),
        {
          ...beforeLast,
          [separator]: current,
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertIncluding;
