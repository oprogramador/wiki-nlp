const _ = require('lodash');
const {
  aboveWords,
  aroundWords,
  currencies,
  fuzzy,
  isNumeric,
  largeNumbers,
  nullWords,
} = require('./numberResources');
const toLowerCase = require('./toLowerCase');
const { getBeforeLast, withoutLastOne, withoutLast } = require('./listUtils');

const specialWords = [...aroundWords, ...aboveWords, ...nullWords];

const groupNumbers = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator) || {};
    const beforeLast = getBeforeLast(accumulator);
    if (fuzzy[toLowerCase(current)]) {
      return [
        ...accumulator,
        {
          groupType: 'quantity-raw',
          words: [toLowerCase(current)],
        },
      ];
    }
    if (isNumeric(current)) {
      if (specialWords.includes(toLowerCase(beforeLast)) && Object.keys(currencies).includes(last)) {
        return [
          ...withoutLast(accumulator, 2),
          {
            groupType: 'quantity-raw',
            words: [beforeLast, last, current],
          },
        ];
      }

      if ([...specialWords, ...Object.keys(currencies)].includes(toLowerCase(last))) {
        return [
          ...withoutLastOne(accumulator),
          {
            groupType: 'quantity-raw',
            words: [last, current],
          },
        ];
      }

      return [
        ...accumulator,
        {
          groupType: 'quantity-raw',
          words: [current],
        },
      ];
    }
    if (largeNumbers[current] && last === 'a') {
      return [
        ...withoutLastOne(accumulator),
        {
          groupType: 'quantity-raw',
          words: [last, current],
        },
      ];
    }
    if (largeNumbers[current] || current === '%') {
      return [
        ...withoutLastOne(accumulator),
        {
          ...last,
          words: [
            ...(last.words || []),
            current,
          ],
        },
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = groupNumbers;
