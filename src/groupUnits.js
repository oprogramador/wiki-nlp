const _ = require('lodash');
const {
  withoutLastOne, getBeforeLast, getBeforeBeforeLast, withoutLast,
} = require('./listUtils');

const map = {
  [JSON.stringify('m')]: 'm',
  [JSON.stringify('km')]: 'km',
  [JSON.stringify('mi')]: 'mi',
  [JSON.stringify('ft')]: 'ft',
  [JSON.stringify('km2')]: 'km2',
  [JSON.stringify('metres')]: 'm',
  [JSON.stringify('kilometres')]: 'km',
  [JSON.stringify({ groupType: 'article', words: ['square', 'kilometers'] })]: 'km2',
  [JSON.stringify({ groupType: 'article', words: ['square', 'kilometres'] })]: 'km2',
  [JSON.stringify({ groupType: 'article', words: ['sq', 'mi'] })]: 'mi2',
};

const groupUnits = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator) || {};
    const beforeLast = getBeforeLast(accumulator);
    const beforeBeforeLast = getBeforeBeforeLast(accumulator);

    if (beforeBeforeLast.groupType === 'unit' && beforeLast === '(' && last.groupType === 'unit' && current === ')') {
      return [
        ...withoutLast(accumulator, 2),
      ];
    }
    const unit = map[JSON.stringify(current)];
    if (unit) {
      return [
        ...withoutLastOne(accumulator),
        {
          ...last,
          groupType: 'unit',
          unit,
        },
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = groupUnits;
