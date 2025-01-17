const _ = require('lodash');
const auxiliaryList = require('../utils/auxiliaryList');
const convertPastParticipleToPresent = require('../utils/convertPastParticipleToPresent');
const isAdverb = require('../utils/isAdverb');
const {
  getBeforeLast,
  withoutLastOne,
  withoutLast,
} = require('../utils/listUtils');

const moveAdverbs = phrase => phrase.reduce(
  (accumulator, current) => {
    const beforeLast = getBeforeLast(accumulator);
    const last = _.last(accumulator);

    if (
      auxiliaryList.includes(last)
      && isAdverb(current)
    ) {
      return [
        ...withoutLastOne(accumulator),
        current,
        last,
      ];
    }

    if (
      auxiliaryList.includes(beforeLast)
      && last === 'not'
      && isAdverb(current)
    ) {
      return [
        ...withoutLast(accumulator, 2),
        current,
        beforeLast,
        'not',
      ];
    }

    if (
      auxiliaryList.includes(beforeLast)
      && isAdverb(last)
      && convertPastParticipleToPresent(current)
    ) {
      return [
        ...withoutLastOne(accumulator),
        current,
        last,
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = moveAdverbs;
