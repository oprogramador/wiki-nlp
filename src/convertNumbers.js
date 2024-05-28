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
  .map(
    word => (map[word] || convertWithDigits(word) || word),
  );

module.exports = convertNumbers;
