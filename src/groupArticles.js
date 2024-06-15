const _ = require('lodash');
const auxiliary = require('./auxiliaryList');
const prepositions = require('./prepositionList');
const pronouns = require('./pronounsList');
const isAdverb = require('./isAdverb');
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

const isDissalowed = word => [...auxiliary, ...prepositions, ...pronouns, 'and', 'or'].includes(toLowerCase(word));

const groupArticles = phrase => phrase.reduce(
  (accumulator, current) => {
    if (articles.includes(toLowerCase(current))) {
      return [...accumulator, { groupType: 'article', words: [current] }];
    }
    const last = _.last(accumulator) || {};
    const beforeBeforeLast = accumulator.slice(-3, -2)[0] || {};
    const beforeLast = accumulator.slice(-2, -1)[0] || {};

    if (
      beforeBeforeLast.groupType === 'article'
        && beforeLast === '('
        && isUpperCase(last)
        && current === ')'
    ) {
      return [
        ...accumulator.slice(0, -3),
        {
          ...beforeBeforeLast,
          abbreviation: last,
        },
      ];
    }
    if (
      (
        last.groupType === 'article'
          || (
            !last.groupType
            && last.toLowerCase
            && !isAdverb(last)
            && !isDissalowed(last)
            && isLettersOnly(last)
          )
      )
      && (
        !isDissalowed(current) && isLettersOnly(current)
          || isUpperCase(current)
      )
    ) {
      return [
        ...accumulator.slice(0, -1),
        {
          ...(last.groupType ? last : { groupType: 'article' }),
          words: [
            ...(last.words || [last]),
            current,
          ],
        },
      ];
    }
    if (
      beforeLast.groupType === 'article'
        && isUpperCase(_.last(beforeLast.words))
        && allowedPrepositions.includes(last)
        && isUpperCase(current)
    ) {
      return [
        ...accumulator.slice(0, -2),
        {
          ...beforeLast,
          words: [
            ...beforeLast.words,
            last,
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
