const _ = require('lodash');
const auxiliary = require('../utils/auxiliaryList');
const {
  getBeforeLast,
  getBeforeBeforeLast,
  withoutLast,
} = require('../utils/listUtils');
const isLettersOnly = require('../utils/isLettersOnly');
const isUpperCase = require('../utils/isUpperCase');
const toLowerCase = require('../utils/toLowerCase');

const condition = word => (isLettersOnly(word) && isUpperCase(word))
  || (
    word.groupType === 'article'
    && !word.abbreviation
    && isUpperCase(_.last(word.words))
    && (isUpperCase(word.words[0]) || (toLowerCase(word.words[0]) === 'the' && isUpperCase(word.words[1])))
  );

const allowedBefore = [
  ...auxiliary,
  'at',
  'in',
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
    if (toLowerCase(beforeLast) === 'at' && _.get(last, 'groupType') === 'article' && current === ',') {
      return [
        ...withoutLast(accumulator, 2),
        {
          groupType: 'locality',
          precise: last,
          preposition: 'at',
        },
      ];
    }
    if ((allowedBefore.includes(toLowerCase(beforeBeforeLast)) || _.isEqual(beforeBeforeLast, {}))
      && condition(beforeLast)
      && last === ','
      && (condition(current))
    ) {
      return [
        ...withoutLast(accumulator, 3),
        {
          general: current,
          groupType: 'locality',
          precise: beforeLast,
          preposition: beforeBeforeLast,
        },
      ];
    }
    if (beforeLast.groupType === 'locality' && last === ',' && !allowedAfterComma.includes(current)) {
      return [
        ...withoutLast(accumulator, 2),
        ...(_.isEqual(beforeLast.preposition, {}) ? [] : [beforeLast.preposition]),
        beforeLast.precise,
        ',',
        beforeLast.general,
        last,
        current,
      ];
    }
    if (current.extra) {
      return [
        ...accumulator,
        {
          ...current,
          extra: groupLocality(current.extra),
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = groupLocality;
