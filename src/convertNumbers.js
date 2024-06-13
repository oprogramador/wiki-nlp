const {
  wordsToNumbers,
  largeNumbers,
  aroundWords,
  aboveWords,
  currencies,
  convertWithDigits,
} = require('./numberResources');

const convertNumbers = phrase => phrase
  .reduce((accumulator, current) => {
    if (current.groupType !== 'quantity-raw') {
      return [
        ...accumulator,
        current,
      ];
    }
    let groupType = 'quantity';
    let { words } = current;
    let isExact = true;
    let isMin = false;
    let currency = null;
    if ([...aroundWords, ...aboveWords].includes(words[0])) {
      if (aroundWords.includes(words[0])) {
        isExact = false;
      }
      if (aboveWords.includes(words[0])) {
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
    let value = wordsToNumbers[valueWord] || convertWithDigits(valueWord);
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

    return [
      ...accumulator,
      {
        groupType,
        ...(!isExact ? { isExact } : {}),
        [isMin ? 'min' : 'value']: value,
        ...(currency ? { currency } : {}),
      },
    ];
  },
  []);

module.exports = convertNumbers;
