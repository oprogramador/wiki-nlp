/* eslint-disable sort-keys */
const wordsToNumbers = {
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

const largeNumbers = {
  million: 1e6,
  billion: 1e9,
  trillion: 1e12,
};

const aroundWords = [
  'around',
  'about',
  'approximately',
];

const aboveWords = [
  'above',
  'over',
];

const currencies = {
  '€': 'EUR',
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

const isNumeric = word => wordsToNumbers[word] || typeof convertWithDigits(word) === 'number';

module.exports = {
  wordsToNumbers,
  largeNumbers,
  aroundWords,
  aboveWords,
  currencies,
  convertWithDigits,
  isNumeric,
};
