const _ = require('lodash');
const toLowerCase = require('./toLowerCase');
const {
  getBeforeLast,
  getBeforeBeforeLast,
  getBeforeBeforeBeforeLast,
  withoutFirst,
} = require('./listUtils');

const convertBetween = phrase => phrase
  .reduce((accumulator, current) => {
    const beforeBeforeBeforeLast = getBeforeBeforeBeforeLast(accumulator);
    const beforeBeforeLast = getBeforeBeforeLast(accumulator);
    const beforeLast = getBeforeLast(accumulator);
    const last = _.last(accumulator);
    if (
      toLowerCase(beforeBeforeBeforeLast) === 'between'
      && beforeLast === ','
      && last === 'and'
    ) {
      return [
        ...withoutFirst(accumulator, 4),
        'in',
        `${beforeBeforeLast}–${current}`,
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = convertBetween;
