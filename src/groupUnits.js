const _ = require('lodash');
const { withoutLastOne } = require('./listUtils');

const map = {
  [JSON.stringify('km2')]: 'km2',
  [JSON.stringify({ groupType: 'article', words: ['square', 'kilometers'] })]: 'km2',
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
