const _ = require('lodash');
const articles = require('../utils/articleList');
const auxiliary = require('../utils/auxiliaryList');
const prepositions = require('../utils/prepositionList');
const pronouns = require('../utils/pronounsList');
const irregularVerbsList = require('../utils/irregularVerbsList');
const isAdverb = require('../utils/isAdverb');
const isLettersOnly = require('../utils/isLettersOnly');
const toLowerCase = require('../utils/toLowerCase');
const isUpperCase = require('../utils/isUpperCase');
const logicalList = require('../utils/logicalList');
const {
  getBeforeLast,
  getBeforeBeforeLast,
  withoutLast,
  withoutLastOne,
} = require('../utils/listUtils');

const allowedPrepositions = [
  'for',
  'of',
];

const isDissalowed = word => [
  ...auxiliary,
  ...prepositions,
  ...pronouns,
  ...logicalList,
  'no',
  'not',
  'according',
  'every',
]
  .includes(toLowerCase(word));

const irregularVerbsPast = irregularVerbsList.map(item => item.past);
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
      pronouns.includes(toLowerCase(beforeLast))
      && irregularVerbsPast.includes(last)
      && isUpperCase(current)
    ) {
      return [...accumulator, { groupType: 'article', words: [current] }];
    }

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
