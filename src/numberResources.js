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
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
};

const stripPlural = (word) => {
  if (!word.endsWith) {
    return word;
  }
  if (word.endsWith('ies')) {
    return word.replace(/ies$/, 'y');
  }

  return word.replace(/s$/, '');
};

const ordinalToNumberWord = (word) => {
  if (word === 'second') {
    return 'two';
  }
  if (word === 'half') {
    return 'two';
  }
  if (word === 'third') {
    return 'three';
  }
  if (!word.replace) {
    return '';
  }
  if (word.endsWith('fth')) {
    return word.replace(/fth$/, 've');
  }

  return word.replace(/th$/, '');
};

const ordinalToNumber = word => wordsToNumbers[ordinalToNumberWord(stripPlural(word))];

const largeNumbers = {
  million: 1e6,
  billion: 1e9,
  trillion: 1e12,
};

const fuzzy = {
  handful: {
    min: 1,
    max: 5,
  },
  number: {
    min: 3,
  },
  several: {
    min: 3,
    max: 99,
  },
  many: {
    min: 3,
  },
  numerous: {
    min: 3,
  },
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
  $: 'USD',
  us$: 'USD',
};

const convertWithDigits = (word) => {
  if (!word.replace) {
    return word;
  }
  const replaced = word.replace(/,/g, '');
  if (replaced === '') {
    return word;
  }
  const number = Number(replaced);
  if (Number.isNaN(number)) {
    return word;
  }

  return number;
};

const isNumeric = (word) => {
  if (wordsToNumbers[word]) {
    return true;
  }
  if (typeof convertWithDigits(word) === 'number') {
    return true;
  }
  if (!word.split) {
    return false;
  }
  const split = word.split('–');
  if (typeof convertWithDigits(split[0]) === 'number') {
    return true;
  }

  return false;
};

module.exports = {
  aboveWords,
  aroundWords,
  convertWithDigits,
  currencies,
  fuzzy,
  isNumeric,
  largeNumbers,
  ordinalToNumber,
  wordsToNumbers,
};
