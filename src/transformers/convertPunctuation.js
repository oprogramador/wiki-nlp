const _ = require('lodash');
const { withoutFirst, withoutLastOne } = require('../utils/listUtils');
const { currencies } = require('../utils/numberResources');
const toLowerCase = require('../utils/toLowerCase');

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
  const found = list.find(x => toLowerCase(word).startsWith(x));
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
