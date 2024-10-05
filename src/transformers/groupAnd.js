const _ = require('lodash');
const { getLast, withoutLast } = require('../utils/listUtils');

const groupAnd = (phrase, separator = 'and') => phrase.reduce(
  (accumulator, current) => {
    const last = _.last(accumulator) || {};
    if (last === separator && (current.groupType !== 'share' || current.item)) {
      const index = _.findLastIndex(
        accumulator,
        (word, i) => word !== ',' && (accumulator.length - i) % 2 === 0,
      );
      const count = accumulator.length - index - 1;

      return [
        ...withoutLast(accumulator, count),
        {
          groupType: separator,
          members: [
            ...getLast(accumulator, count).filter(word => ![',', separator].includes(word)),
            current,
          ],
        },
      ];
    }
    if (_.get(current, 'groupType') === 'extra') {
      return [
        ...accumulator,
        {
          ...current,
          extra: groupAnd(current.extra),
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = groupAnd;
