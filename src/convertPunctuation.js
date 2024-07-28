const _ = require('lodash');
const { withoutFirst, withoutLastOne } = require('./listUtils');
const { currencies } = require('./numberResources');

const list = [
  ...Object.keys(currencies),
  ',',
  ':',
  '%',
  '(',
  ')',
  '–',
  '"',
];

const convertPunctuationRecursive = (word) => {
  let start = '';
  let middle = word;
  let end = '';
  const last = _.last(word);
  if (list.includes(last)) {
    middle = withoutLastOne(middle);
    end = last;
  }
  const found = list.find(x => word.startsWith(x));
  if (found) {
    start = found;
    middle = withoutFirst(middle, found.length);
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
