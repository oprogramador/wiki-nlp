const _ = require('lodash');
const toLowerCase = require('../utils/toLowerCase');
const { getLast, withoutLast } = require('../utils/listUtils');
const { ordinalToNumber } = require('../utils/numberResources');

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
        ...withoutLast(accumulator, 4),
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
