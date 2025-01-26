const _ = require('lodash');
const { withoutLastOne } = require('../utils/listUtils');

const moveAdverbGroupsBeforeQuantity = phrase => phrase.reduce(
  (accumulator, current) => {
    const last = _.last(accumulator);
    if (
      _.get(last, 'groupType') === 'quantity'
      && _.get(current, 'groupType') === 'adverb'
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

module.exports = moveAdverbGroupsBeforeQuantity;
