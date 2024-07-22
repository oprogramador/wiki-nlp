const _ = require('lodash');
const { withoutLastOne } = require('./listUtils');

const map = {
  [JSON.stringify('ft')]: 'ft',
  [JSON.stringify('g')]: 'g',
  [JSON.stringify('grams')]: 'g',
  [JSON.stringify('kg')]: 'kg',
  [JSON.stringify('kilograms')]: 'kg',
  [JSON.stringify('kilometres')]: 'km',
  [JSON.stringify('km')]: 'km',
  [JSON.stringify('km2')]: 'km2',
  [JSON.stringify('m')]: 'm',
  [JSON.stringify('metres')]: 'm',
  [JSON.stringify('mi')]: 'mi',
  [JSON.stringify('t')]: 't',
  [JSON.stringify('tonnes')]: 't',
  [JSON.stringify('tons')]: 't',
  [JSON.stringify({ groupType: 'article', words: ['sq', 'mi'] })]: 'mi2',
  [JSON.stringify({ groupType: 'article', words: ['square', 'kilometers'] })]: 'km2',
  [JSON.stringify({ groupType: 'article', words: ['square', 'kilometres'] })]: 'km2',
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
    const unit = map[JSON.stringify(current.basic || current)];
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
