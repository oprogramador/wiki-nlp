const _ = require('lodash');

/* eslint-disable sort-keys */
const map = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
};

const convertWithDigits = (word) => {
  if (!word.replace) {
    return word;
  }
  const replaced = word.replace(/,/g, '');
  const number = Number(replaced);
  if (Number.isNaN(number)) {
    return word;
  }

  return number;
};

const convertNumbers = phrase => phrase
  .reduce((accumulator, current) => {
    if (current === '%') {
      return [
        ...accumulator.slice(0, -1),
        {
          groupType: 'share',
          value: _.last(accumulator) / 100,
        },
      ];
    }

    return [
      ...accumulator,
      map[current] || convertWithDigits(current) || current,
    ];
  },
  []);

module.exports = convertNumbers;
