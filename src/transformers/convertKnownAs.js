const _ = require('lodash');
const {
  getBeforeLast,
  getBeforeBeforeLast,
  withoutLast,
} = require('../utils/listUtils');

const createArticleIfNeeded = (word) => {
  if (!_.get(word, 'groupType')) {
    return {
      groupType: 'article',
      words: [word],
    };
  }

  return word;
};

const convertKnownAs = phrase => phrase.reduce(
  (accumulator, current) => {
    const beforeBeforeLast = getBeforeBeforeLast(accumulator);
    const beforeLast = getBeforeLast(accumulator);
    const last = _.last(accumulator);

    if (
      last === '#alternative-name'
      && _.get(current, 'groupType') === 'or'
    ) {
      return [
        ...withoutLast(accumulator, 3),
        {
          ...createArticleIfNeeded(beforeLast),
          alternativeNames: current.members,
        },
      ];
    }

    if (
      beforeLast === '#alternative-name'
      && current === ','
    ) {
      return [
        ...withoutLast(accumulator, 4),
        {
          ...createArticleIfNeeded(beforeBeforeLast),
          alternativeNames: [last],
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertKnownAs;
