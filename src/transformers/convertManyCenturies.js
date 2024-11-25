const _ = require('lodash');
const toLowerCase = require('../utils/toLowerCase');
const { getFirst, getLast, withoutLast } = require('../utils/listUtils');
const { ordinalToNumber } = require('../utils/numberResources');

const convertManyCenturies = phrase => phrase.reduce(
  (accumulator, current) => {
    const [
      last,
      beforeLast,
      beforeBeforeLast,
      beforeBeforeBeforeLast,
      before4Last,
    ] = getLast(accumulator, 5)
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
      toLowerCase(before4Last) === 'in'
      && JSON.stringify(getFirst(_.get(beforeBeforeBeforeLast, 'words', []), 2)) === '["the","late"]'
      && beforeBeforeLast === ','
      && beforeLast === 'and'
      && last === 'early'
      && _.get(current, 'words.1') === 'centuries'
    ) {
      const [minCentury, maxCentury] = _.sortBy([
        ordinalToNumber(_.get(beforeBeforeBeforeLast, 'words.2')),
        ordinalToNumber(_.get(current, 'words.0')),
      ]);

      return [
        ...withoutLast(accumulator, 5),
        'in',
        {
          groupType: 'date',
          maxYear: (maxCentury - 1) * 100 + 50,
          minYear: (minCentury - 1) * 100 + 51,
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
