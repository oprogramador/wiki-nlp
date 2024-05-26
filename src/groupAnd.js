const _ = require('lodash');

const groupAnd = phrase => phrase.reduce(
  (accumulator, current) => {
    const last = _.last(accumulator) || {};
    if (last === 'and') {
      const index = _.findLastIndex(
        accumulator,
        (word, i) => word !== ',' && (accumulator.length - i) % 2 === 0,
      );
      const count = accumulator.length - index - 1;

      return [
        ...accumulator.slice(0, -count),
        {
          groupType: 'and',
          members: [
            ...accumulator.slice(-count).filter(word => ![',', 'and'].includes(word)),
            current,
          ],
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = groupAnd;
