const {
  wordsToNumbers,
  largeNumbers,
  fuzzy,
  aroundWords,
  aboveWords,
  currencies,
  convertWithDigits,
} = require('./numberResources');
const toLowerCase = require('./toLowerCase');

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
    let currency = null;
    if ([...aroundWords, ...aboveWords].includes(toLowerCase(words[0]))) {
      if (aroundWords.includes(toLowerCase(words[0]))) {
        isExact = false;
      }
      if (aboveWords.includes(toLowerCase(words[0]))) {
        isMin = true;
      }
      words = words.slice(1);
    }
    if (currencies[words[0]]) {
      groupType = 'currency';
      currency = currencies[words[0]];
      words = words.slice(1);
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
    }
    if (minValue) {
      maxValue = value;
      value = null;
    }
    if (isMin && !minValue) {
      minValue = value;
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
