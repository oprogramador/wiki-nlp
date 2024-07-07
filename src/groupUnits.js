const _ = require('lodash');
const { withoutLastOne } = require('./listUtils');

const map = {
  [JSON.stringify('km')]: 'km',
  [JSON.stringify('km2')]: 'km2',
  [JSON.stringify('metres')]: 'm',
  [JSON.stringify('kilometres')]: 'km',
  [JSON.stringify({ groupType: 'article', words: ['square', 'kilometers'] })]: 'km2',
  [JSON.stringify({ groupType: 'article', words: ['square', 'kilometres'] })]: 'km2',
};

const groupUnits = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator) || {};

    const unit = map[JSON.stringify(current)];
    if (unit) {
      return [
        ...withoutLastOne(accumulator),
        {
          ...last,
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
