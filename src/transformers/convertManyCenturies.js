const _ = require('lodash');
const toLowerCase = require('../utils/toLowerCase');
const { getLast, withoutLast } = require('../utils/listUtils');
const { ordinalToNumber } = require('../utils/numberResources');

const convertManyCenturies = phrase => phrase.reduce(
  (accumulator, current) => {
    const [
      last,
      beforeLast,
      beforeBeforeLast,
      beforeBeforeBeforeLast,
    ] = getLast(accumulator, 4)
      .reverse();

    if (
      toLowerCase(beforeBeforeLast) === 'in'
      && JSON.stringify(_.get(beforeLast, 'words')) === '["the"]'
      && /–/.test(last)
      && current === 'centuries'
    ) {
      const [first, second] = last.split('–');
      const [minCentury, maxCentury] = _.sortBy([
        ordinalToNumber(first),
        ordinalToNumber(second),
      ]);

      return [
        ...withoutLast(accumulator, 3),
        'in',
        {
          groupType: 'date',
          maxYear: (maxCentury - 1) * 100 + 100,
          minYear: (minCentury - 1) * 100 + 1,
        },
      ];
    }

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
