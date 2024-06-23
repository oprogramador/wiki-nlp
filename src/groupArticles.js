const _ = require('lodash');
const auxiliary = require('./auxiliaryList');
const prepositions = require('./prepositionList');
const pronouns = require('./pronounsList');
const irregularVerbsPast = require('./irregularVerbsPastList');
const isAdverb = require('./isAdverb');
const isLettersOnly = require('./isLettersOnly');
const toLowerCase = require('./toLowerCase');
const isUpperCase = require('./isUpperCase');
const {
  getBeforeLast,
  getBeforeBeforeLast,
  withoutLast,
  withoutLastOne,
} = require('./listUtils');

const articles = [
  'a',
  'an',
  'the',
];

const allowedPrepositions = [
  'for',
  'of',
];

const isDissalowed = word => [
  ...auxiliary,
  ...prepositions,
  ...pronouns,
  'and',
  'or',
  'no',
  'not',
]
  .includes(toLowerCase(word));

const looksStronglyLikeVerb = word => /ed$/.test(word) || irregularVerbsPast.includes(word);
const looksLikeVerb = word => /s$/.test(word) || looksStronglyLikeVerb(word);

const groupArticles = phrase => phrase.reduce(
  (accumulator, current) => {
    if (articles.includes(toLowerCase(current))) {
      return [...accumulator, { groupType: 'article', words: [current] }];
    }
    const last = _.last(accumulator) || {};
    const beforeBeforeLast = getBeforeBeforeLast(accumulator);
    const beforeLast = getBeforeLast(accumulator);

    if (
      beforeBeforeLast.groupType === 'article'
        && beforeLast === '('
        && isUpperCase(last)
        && current === ')'
    ) {
      return [
        ...withoutLast(accumulator, 3),
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
      && !(
        (
          isUpperCase(_.last(last.words))
          || (looksStronglyLikeVerb(current) && isUpperCase(last))
        )
        && !articles.includes(toLowerCase(_.last(last.words)))
        && !isUpperCase(current)
        && looksLikeVerb(current)
      )
    ) {
      return [
        ...withoutLastOne(accumulator),
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
        ...withoutLast(accumulator, 2),
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
