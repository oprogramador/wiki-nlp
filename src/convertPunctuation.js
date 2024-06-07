const _ = require('lodash');

const list = [
  ',',
  ':',
  '%',
  '€',
  '(',
  ')',
];

const convertPunctuation = phrase => phrase
  .map((word) => {
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

    return [start, middle, end].filter(x => x);
  })
  .flat();

module.exports = convertPunctuation;
