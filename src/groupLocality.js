const _ = require('lodash');
const auxiliary = require('./auxiliaryList');
const prepositions = require('./prepositionList');
const pronouns = require('./pronounsList');
const {
  getBeforeLast, getBeforeBeforeLast, withoutLast,
} = require('./listUtils');
const isLettersOnly = require('./isLettersOnly');
const isUpperCase = require('./isUpperCase');
const toLowerCase = require('./toLowerCase');

const isDissalowed = word => [
  ...auxiliary,
  ...prepositions,
  ...pronouns,
  'and',
  'or',
  'no',
  'not',
  'previously',
  'later',
  'initially',
  'constitutionally',
]
  .includes(toLowerCase(word));

const condition = word => (isLettersOnly(word) && isUpperCase(word) && !isDissalowed(word))
  || (
    word.groupType === 'article'
    && !word.abbreviation
    && isUpperCase(_.last(word.words))
    && (isUpperCase(word.words[0]) || (toLowerCase(word.words[0]) === 'the' && isUpperCase(word.words[1])))
  );

const allowedBefore = [
  ...auxiliary,
  'in',
  '(',
];

const allowedAfterComma = [
  ...auxiliary,
  'at',
  ')',
];

const groupLocality = phrase => phrase.reduce(
  (accumulator, current) => {
    const last = _.last(accumulator) || {};
    const beforeLast = getBeforeLast(accumulator);
    const beforeBeforeLast = getBeforeBeforeLast(accumulator);
    if (allowedBefore.includes(toLowerCase(beforeBeforeLast))
      && condition(beforeLast)
      && last === ','
      && (condition(current))
    ) {
      return [
        ...withoutLast(accumulator, 2),
        {
          general: current,
          groupType: 'locality',
          precise: beforeLast,
        },
      ];
    }
    if (beforeLast.groupType === 'locality' && last === ',' && !allowedAfterComma.includes(current)) {
      return [
        ...withoutLast(accumulator, 2),
        beforeLast.precise,
        ',',
        beforeLast.general,
        last,
        current,
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = groupLocality;
