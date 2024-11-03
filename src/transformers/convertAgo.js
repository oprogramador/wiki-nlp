const _ = require('lodash');
const {
  getBeforeLast,
  withoutLast,
} = require('../utils/listUtils');

const convertAgo = ({ now }) => phrase => phrase.reduce(
  (accumulator, current) => {
    const beforeLast = getBeforeLast(accumulator);
    const last = _.last(accumulator) || {};

    if (
      _.get(beforeLast, 'groupType') === 'quantity'
      && last === 'years'
      && current === 'ago'
    ) {
      return [
        ...withoutLast(accumulator, 2),
        'in',
        {
          groupType: 'date',
          ..._.pick(beforeLast, 'isExact'),
          ...(beforeLast.value ? { year: now.getFullYear() - beforeLast.value } : {}),
          ...(beforeLast.max ? { minYear: now.getFullYear() - beforeLast.max } : {}),
          ...(beforeLast.min ? { maxYear: now.getFullYear() - beforeLast.min } : {}),
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertAgo;
