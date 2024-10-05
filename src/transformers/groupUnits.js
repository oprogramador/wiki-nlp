const _ = require('lodash');
const { withoutLastOne } = require('../utils/listUtils');

const map = {
  [JSON.stringify('ft')]: { factor: 0.3048, unit: 'm' },
  [JSON.stringify('g')]: { factor: 0.001, unit: 'kg' },
  [JSON.stringify('grams')]: { factor: 0.001, unit: 'kg' },
  [JSON.stringify('kg')]: { factor: 1, unit: 'kg' },
  [JSON.stringify('kilograms')]: { factor: 1, unit: 'kg' },
  [JSON.stringify('kilometres')]: { factor: 1000, unit: 'm' },
  [JSON.stringify('km')]: { factor: 1000, unit: 'm' },
  [JSON.stringify('km2')]: { factor: 1e6, unit: 'm2' },
  [JSON.stringify('m')]: { factor: 1, unit: 'm' },
  [JSON.stringify('metres')]: { factor: 1, unit: 'm' },
  [JSON.stringify('mi')]: { factor: 1609.34, unit: 'm' },
  [JSON.stringify('t')]: { factor: 1000, unit: 'kg' },
  [JSON.stringify('tonnes')]: { factor: 1000, unit: 'kg' },
  [JSON.stringify('tons')]: { factor: 1000, unit: 'kg' },
  [JSON.stringify({ groupType: 'article', words: ['sq', 'mi'] })]: { factor: 2589975, unit: 'm2' },
  [JSON.stringify({ groupType: 'article', words: ['square', 'kilometers'] })]: { factor: 1e6, unit: 'm2' },
  [JSON.stringify({ groupType: 'article', words: ['square', 'kilometres'] })]: { factor: 1e6, unit: 'm2' },
};

const groupUnits = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator) || {};

    if (last.groupType === 'extra' && last.basic.groupType === 'unit') {
      return [
        ...withoutLastOne(accumulator),
        last.basic,
      ];
    }
    const info = map[JSON.stringify(_.get(current, 'basic') || current)];
    if (info) {
      return [
        ...withoutLastOne(accumulator),
        {
          ...last,
          groupType: 'unit',
          unit: info.unit,
          value: last.value * info.factor,
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
