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

const isNumeric = word => wordsToNumbers[word] || !Number.isNaN(Number(word.replace(/,/g, '')));

module.exports = {
  wordsToNumbers,
  largeNumbers,
  aroundWords,
  aboveWords,
  currencies,
  isNumeric,
};
