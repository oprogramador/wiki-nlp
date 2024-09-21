const _ = require('lodash');
const toLowerCase = require('./toLowerCase');
const { getLast, withoutFirst } = require('./listUtils');
const { ordinalToNumber } = require('./numberResources');

const convertManyCenturies = phrase => phrase.reduce(
  (accumulator, current) => {
    const [
      beforeBeforeBeforeLast,
      beforeBeforeLast,
      beforeLast,
      last,
    ] = getLast(accumulator, 4);

    if (
      toLowerCase(beforeBeforeBeforeLast) === 'between'
      && beforeLast === ','
      && last === 'and'
      && _.get(current, 'words.1') === 'centuries'
    ) {
      // Array.prototype.sort is unreliable when sorting numbers.
      const [minCentury, maxCentury] = _.sortBy([
        ordinalToNumber(beforeBeforeLast.words[1]),
        ordinalToNumber(current.words[0]),
      ]);

      return [
        ...withoutFirst(accumulator, 4),
        'in',
        {
          groupType: 'date',
          maxYear: (maxCentury - 1) * 100 + 100,
          minYear: (minCentury - 1) * 100 + 1,
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertManyCenturies;
