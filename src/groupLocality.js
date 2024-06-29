const _ = require('lodash');
const auxiliary = require('./auxiliaryList');
const prepositions = require('./prepositionList');
const pronouns = require('./pronounsList');
const { getBeforeLast, withoutLast } = require('./listUtils');
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

const convertPossibly = (beforeLast, last, current) => {
  if (condition(beforeLast) && last === ',' && condition(current)) {
    return [
      {
        general: current,
        groupType: 'locality',
        precise: beforeLast,
      },
    ];
  }

  return [beforeLast, last, current];
};

const groupLocality = phrase => phrase.reduce(
  (accumulator, current) => {
    const last = _.last(accumulator) || {};
    const beforeLast = getBeforeLast(accumulator);
    if (beforeLast.groupType === 'locality' && last === ',' && (condition(current) || isDissalowed(current))) {
      return [
        ...withoutLast(accumulator, 2),
        beforeLast.precise,
        ',',
        beforeLast.general,
        last,
        current,
      ];
    }
    if (condition(beforeLast) && last === ',' && condition(current)) {
      return [
        ...withoutLast(accumulator, 2),
        ...convertPossibly(beforeLast, last, current),
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = groupLocality;
