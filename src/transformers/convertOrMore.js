const _ = require('lodash');
const {
  getBeforeLast,
  getBeforeBeforeLast,
  withoutLast,
} = require('../utils/listUtils');

const convertOrMore = phrase => phrase.reduce(
  (accumulator, current) => {
    const beforeBeforeLast = getBeforeBeforeLast(accumulator);
    const beforeLast = getBeforeLast(accumulator);
    const last = _.last(accumulator);

    if (
      _.get(beforeBeforeLast, 'groupType') === 'quantity'
      && beforeLast === ','
      && last === 'or'
      && current === 'more'
    ) {
      return [
        ...withoutLast(accumulator, 3),
        _.omit(
          {
            ...beforeBeforeLast,
            min: beforeBeforeLast.value,
          },
          'value',
        ),
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertOrMore;
