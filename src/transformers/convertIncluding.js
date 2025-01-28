const _ = require('lodash');
const { getBeforeLast, withoutLast } = require('../utils/listUtils');
const createArticleIfNeeded = require('../utils/createArticleIfNeeded');

const convertIncluding = ({ separator }) => phrase => phrase.reduce(
  (accumulator, current) => {
    const beforeLast = getBeforeLast(accumulator);
    const last = _.last(accumulator);

    if (
      last === separator
    ) {
      return [
        ...withoutLast(accumulator, 2),
        {
          ...createArticleIfNeeded(beforeLast),
          [separator]: current,
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertIncluding;
