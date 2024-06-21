const _ = require('lodash');
const {
  largeNumbers,
  fuzzy,
  aroundWords,
  aboveWords,
  currencies,
  isNumeric,
} = require('./numberResources');
const toLowerCase = require('./toLowerCase');

const groupNumbers = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator) || {};
    const beforeLast = accumulator.slice(-2, -1)[0] || {};
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
      if ([...aroundWords, ...aboveWords].includes(toLowerCase(beforeLast)) && Object.keys(currencies).includes(last)) {
        return [
          ...accumulator.slice(0, -2),
          {
            groupType: 'quantity-raw',
            words: [beforeLast, last, current],
          },
        ];
      }

      if ([...aroundWords, ...aboveWords, ...Object.keys(currencies)].includes(toLowerCase(last))) {
        return [
          ...accumulator.slice(0, -1),
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
        ...accumulator.slice(0, -1),
        {
          groupType: 'quantity-raw',
          words: [last, current],
        },
      ];
    }
    if (largeNumbers[current] || current === '%') {
      return [
        ...accumulator.slice(0, -1),
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
