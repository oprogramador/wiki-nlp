const _ = require('lodash');
const { withoutLastOne } = require('./listUtils');

/* eslint-disable sort-keys */
const map = {
  half: 2,
  third: 3,
  thirds: 3,
  fourth: 4,
  fourths: 4,
  fifth: 5,
  fifths: 5,
  sixth: 6,
  sixths: 6,
  seventh: 7,
  sevenths: 7,
  eighth: 8,
  eighths: 8,
  ninth: 9,
  ninths: 9,
  tenth: 10,
  tenths: 10,
  eleventh: 11,
  elevenths: 11,
  twelfth: 12,
  twelfths: 12,
};

const convertFractions = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator) || {};

    const denominator = map[current];
    if (denominator) {
      return [
        ...withoutLastOne(accumulator),
        {
          ...last,
          value: last.value / denominator,
        },
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = convertFractions;
