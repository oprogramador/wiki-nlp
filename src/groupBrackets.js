const _ = require('lodash');
const {
  getBeforeLast,
  withoutLast,
  withoutLastOne,
} = require('./listUtils');

const groupBrackets = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator) || {};
    const beforeLast = getBeforeLast(accumulator);

    if (last.groupType === 'extra' && current !== ')' && last.level) {
      return [
        ...withoutLast(accumulator, 1),
        {
          ...last,
          extra: [
            ...last.extra,
            current,
          ],
        },
      ];
    }

    if (last === '(') {
      return [
        ...withoutLast(accumulator, 2),
        {
          basic: beforeLast,
          extra: [current],
          groupType: 'extra',
          level: 1,
        },
      ];
    }
    if (current === ')') {
      return [
        ...withoutLastOne(accumulator),
        _.omit(last, 'level'),
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = groupBrackets;
