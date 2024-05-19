const _ = require('lodash');
const toLowerCase = require('./toLowerCase');

const articles = [
  'a',
  'an',
  'the',
];

const groupArticles = phrase => phrase.reduce(
  (accumulator, current) => (articles.includes(toLowerCase(_.last(accumulator)))
    ? [...accumulator.slice(0, -1), [_.last(accumulator), current]]
    : [...accumulator, current]),
  [],
);

module.exports = groupArticles;
