const _ = require('lodash');
const {
  getBeforeBeforeLast,
  getBeforeLast,
  getFirst,
  getLast,
  withoutLast,
  withoutLastOne,
} = require('../utils/listUtils');
const {
  ordinalToNumber,
  wordsToNumbers,
} = require('../utils/numberResources');
const toLowerCase = require('../utils/toLowerCase');

const omit = (item, toOmit) => {
  if (typeof item === 'object') {
    return _.omit(item, toOmit);
  }

  return item;
};

const omitUndefined = object => _.omitBy(object, x => typeof x === 'undefined');

const convertOutOf = phrase => phrase
  .reduce((accumulator, current) => {
    const farBefore = getFirst(getLast(accumulator, 5), 2);
    const beforeBeforeLast = getBeforeBeforeLast(accumulator);
    const beforeLast = getBeforeLast(accumulator);
    const last = _.last(accumulator);

    if (
      _.get(farBefore, '0.groupType') === 'quantity'
      && _.get(farBefore, '1') === 'to'
      && toLowerCase(beforeLast) === 'out'
      && last === 'of'
      && _.get(current, 'groupType') === 'quantity'
    ) {
      const { isExact } = farBefore[0];
      const item = current.item || beforeBeforeLast.item;

      return [
        ...withoutLast(accumulator, 5),
        omitUndefined({
          groupType: 'outOf',
          isExact,
          item,
          max: beforeBeforeLast.value,
          maxScope: current.value,
          min: farBefore[0].value,
        }),
      ];
    }

    if (
      toLowerCase(beforeLast) === 'out'
      && last === 'of'
      && _.get(current, 'groupType') === 'quantity'
    ) {
      const number = ordinalToNumber(beforeBeforeLast)
        || beforeBeforeLast.value
        || wordsToNumbers[toLowerCase(beforeBeforeLast)];
      const { isExact } = beforeBeforeLast;
      const item = current.item || beforeBeforeLast.item;

      return [
        ...withoutLast(accumulator, 3),
        omitUndefined({
          groupType: 'outOf',
          isExact,
          item,
          max: _.get(beforeBeforeLast, 'members.1.value'),
          maxScope: current.value,
          min: _.get(beforeBeforeLast, 'members.0.value'),
          number,
          ..._.pick(beforeBeforeLast, 'min', 'max'),
        }),
      ];
    }
    if (
      _.get(current, 'extra.0') === 'out'
      && _.get(current, 'extra.1') === 'of'
    ) {
      const number = ordinalToNumber(last)
        || last.value
        || wordsToNumbers[toLowerCase(last)]
        || current.basic.value
        || ordinalToNumber(current.basic);

      const item = current.basic.groupType === 'quantity'
        ? current.extra[3]
        : omit(current.basic, 'value');

      return [
        ...withoutLast(
          accumulator,
          ['quantity', 'currency'].includes(current.basic.groupType) ? 0 : 1,
        ),
        {
          groupType: 'outOf',
          ...(item ? { item } : {}),
          maxScope: current.extra[2].value,
          number,
        },
      ];
    }
    if (
      _.get(last, 'maxScope')
      && !last.number
      && _.get(current, 'value')
    ) {
      return [
        ...withoutLastOne(accumulator),
        {
          ...last,
          number: current.value,
        },
      ];
    }
    if (
      _.get(beforeLast, 'maxScope')
      && !beforeLast.number
      && last === ','
      && _.get(current, 'value')
    ) {
      return [
        ...withoutLast(accumulator, 2),
        {
          ...beforeLast,
          number: current.value,
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
