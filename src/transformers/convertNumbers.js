const {
  aboveWords,
  aroundWords,
  convertWithDigits,
  currencies,
  fuzzy,
  largeNumbers,
  maxWords,
  nullWords,
  wordsToNumbers,
} = require('../utils/numberResources');
const { withoutFirstOne } = require('../utils/listUtils');
const toLowerCase = require('../utils/toLowerCase');

const convertNumbers = phrase => phrase
  .reduce((accumulator, current) => {
    if (current.groupType !== 'quantity-raw') {
      return [
        ...accumulator,
        current,
      ];
    }
    if (fuzzy[current.words[0]]) {
      return [
        ...accumulator,
        {
          groupType: 'quantity',
          ...fuzzy[current.words[0]],
        },
      ];
    }
    let groupType = 'quantity';
    let { words } = current;
    let isExact = true;
    let isMin = false;
    let isMax = false;
    let currency = null;
    if ([...aroundWords, ...aboveWords, ...maxWords, ...nullWords].includes(toLowerCase(words[0]))) {
      if (aroundWords.includes(toLowerCase(words[0]))) {
        isExact = false;
      }
      if (aboveWords.includes(toLowerCase(words[0]))) {
        isMin = true;
      }
      if (maxWords.includes(toLowerCase(words[0]))) {
        isMax = true;
      }
      words = withoutFirstOne(words);
    }
    if (currencies[words[0]]) {
      groupType = 'currency';
      currency = currencies[words[0]];
      words = withoutFirstOne(words);
    }
    const valueWord = words[0];
    let minValue = null;
    let maxValue = null;
    let value = null;
    if (/–/.test(valueWord)) {
      const split = valueWord.split(/–/);
      minValue = convertWithDigits(split[0]);
      value = convertWithDigits(split[1]);
    } else {
      value = wordsToNumbers[valueWord] || convertWithDigits(valueWord);
    }
    const item = words[1];
    if (item === '%') {
      groupType = 'share';
      value *= 0.01;
    }
    if (largeNumbers[item]) {
      if (valueWord === 'a') {
        value = 1;
      }
      value *= largeNumbers[item];
      minValue *= largeNumbers[item];
    }
    if (minValue) {
      maxValue = value;
      value = null;
    }
    if (isMin && !minValue) {
      minValue = value;
      value = null;
    }
    if (isMax) {
      maxValue = value;
      value = null;
    }

    return [
      ...accumulator,
      {
        groupType,
        ...(!isExact ? { isExact } : {}),
        ...(minValue ? { min: minValue } : {}),
        ...(maxValue ? { max: maxValue } : {}),
        ...(value ? { value } : {}),
        ...(currency ? { currency } : {}),
      },
    ];
  },
  []);

module.exports = convertNumbers;
