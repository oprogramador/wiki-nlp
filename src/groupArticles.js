const _ = require('lodash');
const fs = require('fs');
const isLettersOnly = require('./isLettersOnly');
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

const auxiliary = fs
  .readFileSync(`${__dirname}/resources/auxiliary.txt`)
  .toString()
  .split('\n')
  .filter(x => x);

const prepositions = fs
  .readFileSync(`${__dirname}/resources/prepositions.txt`)
  .toString()
  .split('\n')
  .filter(x => x);

const groupArticles = phrase => phrase.reduce(
  (accumulator, current) => {
    if (articles.includes(toLowerCase(current))) {
      return [...accumulator, { groupType: 'article', words: [current] }];
    }
    const last = _.last(accumulator) || {};
    if (last.groupType !== 'article') {
      if (isUpperCase(current) && isUpperCase(last)) {
        return [
          ...accumulator.slice(0, -1),
          {
            groupType: 'article',
            words: [last, current],
          },
        ];
      }

      return [...accumulator, current];
    }
    if (![...auxiliary, ...prepositions].includes(current) && isLettersOnly(current)) {
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
    if (isUpperCase(current)
      || (allowedPrepositions.includes(current) && isUpperCase(_.last(last.words)))
    ) {
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
    if (current.startsWith
      && current.startsWith('(')
      && current.endsWith(')')
      && current.toUpperCase() === current
    ) {
      return [
        ...accumulator.slice(0, -1),
        {
          ...last,
          abbreviation: current.replace(/^\(/, '').replace(/\)$/, ''),
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = groupArticles;
