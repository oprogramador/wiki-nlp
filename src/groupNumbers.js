const _ = require('lodash');
const {
  largeNumbers,
  aroundWords,
  aboveWords,
  currencies,
  isNumeric,
} = require('./numberResources');

const groupNumbers = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator) || {};
    if (isNumeric(current)) {
      if ([...aroundWords, ...aboveWords, ...Object.keys(currencies)].includes(last)) {
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
    const lastWord = _.last(last.words);
    if (last.groupType === 'quantity-raw' && (isNumeric(lastWord) || largeNumbers[lastWord])) {
      return [
        ...accumulator.slice(0, -1),
        {
          ...last,
          words: [
            ...last.words,
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
