const _ = require('lodash');
const toLowerCase = require('./toLowerCase');
const isUpperCase = require('./isUpperCase');

const articles = [
  'a',
  'an',
  'the',
];

const allowedPrepositions = [
  'for',
  'of',
];

const groupArticles = phrase => phrase.reduce(
  (accumulator, current) => {
    if (articles.includes(toLowerCase(current))) {
      return [...accumulator, { groupType: 'article', words: [current] }];
    }
    const last = _.last(accumulator) || {};
    if (last.groupType !== 'article') {
      return [...accumulator, current];
    }
    if (last.words.length < 2 || isUpperCase(current) || allowedPrepositions.includes(current)) {
      return [
        ...accumulator.slice(0, -1),
        {
          ...last,
          words: [
            ...last.words,
            current,
          ],
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = groupArticles;
