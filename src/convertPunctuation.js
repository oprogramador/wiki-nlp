const _ = require('lodash');
const { withoutFirstOne, withoutLastOne } = require('./listUtils');

const list = [
  ',',
  ':',
  '%',
  '€',
  '$',
  '(',
  ')',
  '–',
  '"',
];

const convertPunctuationRecursive = (word) => {
  let start = '';
  let middle = word;
  let end = '';
  const first = _.first(word);
  const last = _.last(word);
  if (list.includes(last)) {
    middle = withoutLastOne(middle);
    end = last;
  }
  if (list.includes(first)) {
    start = first;
    middle = withoutFirstOne(middle);
  }
  const middleGroup = middle === word
    ? [middle]
    : convertPunctuationRecursive(middle);

  return [start, ...middleGroup, end].filter(x => x);
};

const convertPunctuation = phrase => phrase
  .map(word => convertPunctuationRecursive(word))
  .flat();

module.exports = convertPunctuation;
