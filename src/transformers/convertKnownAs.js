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

    if (
      _.get(current, 'groupType') === 'extra'
      && current.extra[0] === 'known'
      && current.extra[1] === 'as'
      && _.get(current.extra[2], 'groupType') === 'or'
    ) {
      return [
        ...accumulator,
        {
          ...createArticleIfNeeded(current.basic),
          alternativeNames: current.extra[2].members,
        },
      ];
    }

    if (
      _.get(current, 'groupType') === 'extra'
      && current.extra[0] === 'known'
      && current.extra[1] === 'as'
    ) {
      return [
        ...accumulator,
        {
          ...createArticleIfNeeded(current.basic),
          alternativeNames: [current.extra[2]],
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertKnownAs;
