const _ = require('lodash');
const auxiliaryList = require('../utils/auxiliaryList');
const isAdverb = require('../utils/isAdverb');
const {
  getBeforeLast, withoutLastOne,
} = require('../utils/listUtils');

const moveAdverbs = phrase => phrase.reduce(
  (accumulator, current) => {
    const beforeLast = getBeforeLast(accumulator);
    const last = _.last(accumulator);

    if (
      auxiliaryList.includes(beforeLast)
      && isAdverb(last)
      && /ed/.test(current)
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
