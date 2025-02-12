const _ = require('lodash');
const {
  getLast,
  getBeforeLast,
  getBeforeBeforeLast,
  withoutLast,
} = require('../utils/listUtils');

const map = {
  centuries: 100,
  decades: 10,
  millennia: 1e3,
  years: 1,
};

const convertAgo = ({ now }) => phrase => phrase.reduce(
  (accumulator, current) => {
    const last4th = getLast(accumulator, 4)[0];
    const beforeBeforeLast = getBeforeBeforeLast(accumulator);
    const beforeLast = getBeforeLast(accumulator);
    const last = _.last(accumulator) || {};

    if (
      last4th === 'over'
      && beforeBeforeLast === 'the'
      && beforeLast === 'last'
      && _.get(last, 'groupType') === 'quantity'
      && map[current]
    ) {
      return [
        ...withoutLast(accumulator, 4),
        'in',
        {
          groupType: 'date',
          maxYear: now.getFullYear(),
          minYear: now.getFullYear() - (last.value || last.min) * map[current],
        },
      ];
    }

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
