const _ = require('lodash');
const createArticleIfNeeded = require('../utils/createArticleIfNeeded');
const isUpperCase = require('../utils/isUpperCase');
const { getBeforeLast, withoutLast } = require('../utils/listUtils');

const groupPrenumbered = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator) || {};
    const beforeLast = getBeforeLast(accumulator);

    if (
      beforeLast.groupType === 'article'
        && ['["a"]', '["the"]'].includes(JSON.stringify(beforeLast.words))
        && last.groupType === 'quantity'
        && current.groupType === 'article'
        && isUpperCase(current.words[0])
        && !/s$/.test(_.last(current.words))
    ) {
      return [
        ...withoutLast(accumulator, 2),
        {
          ...createArticleIfNeeded(current),
          prenumber: last.value,
        },
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = groupPrenumbered;
