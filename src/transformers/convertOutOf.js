const _ = require('lodash');
const {
  getBeforeBeforeLast,
  getBeforeLast,
  withoutLast,
  withoutLastOne,
} = require('../utils/listUtils');
const { ordinalToNumber } = require('../utils/numberResources');
const toLowerCase = require('../utils/toLowerCase');

const convertOutOf = phrase => phrase
  .reduce((accumulator, current) => {
    const beforeBeforeLast = getBeforeBeforeLast(accumulator);
    const beforeLast = getBeforeLast(accumulator);
    const last = _.last(accumulator);

    if (
      toLowerCase(beforeLast) === 'out'
      && last === 'of'
      && _.get(current, 'groupType') === 'quantity'
    ) {
      return [
        ...withoutLast(accumulator, 3),
        {
          groupType: 'outOf',
          item: current.item,
          maxScope: current.value,
          place: ordinalToNumber(beforeBeforeLast) || beforeBeforeLast.value,
        },
      ];
    }
    if (
      _.get(last, 'maxScope')
      && !last.place
      && _.get(current, 'value')
    ) {
      return [
        ...withoutLastOne(accumulator),
        {
          ...last,
          place: current.value,
        },
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = convertOutOf;
