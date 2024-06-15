const _ = require('lodash');

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
    middle = middle.slice(0, -1);
    end = last;
  }
  if (list.includes(first)) {
    start = first;
    middle = middle.slice(1);
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
