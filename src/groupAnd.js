const _ = require('lodash');

const groupAnd = (phrase, separator = 'and') => phrase.reduce(
  (accumulator, current) => {
    const last = _.last(accumulator) || {};
    if (last === separator) {
      const index = _.findLastIndex(
        accumulator,
        (word, i) => word !== ',' && (accumulator.length - i) % 2 === 0,
      );
      const count = accumulator.length - index - 1;

      return [
        ...accumulator.slice(0, -count),
        {
          groupType: separator,
          members: [
            ...accumulator.slice(-count).filter(word => ![',', separator].includes(word)),
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
