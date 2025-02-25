const _ = require('lodash');
const auxiliary = require('../utils/auxiliaryList');
const createArticleIfNeeded = require('../utils/createArticleIfNeeded');
const isAdverb = require('../utils/isAdverb');
const isUpperCase = require('../utils/isUpperCase');
const prepositions = require('../utils/prepositionList');
const pronouns = require('../utils/pronounsList');
const toLowerCase = require('../utils/toLowerCase');
const { withoutLastOne } = require('../utils/listUtils');

const isDissalowed = word => [
  ...auxiliary,
  ...prepositions,
  ...pronouns,
  'almost',
  'late',
  'all',
  'and',
  'or',
  'no',
  'not',
  'later',
]
  .includes(toLowerCase(word))
  || isAdverb(word)
  || /ing$/.test(word);

const groupNumbered = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator) || {};
    if (!isDissalowed(last) && isUpperCase(last) && current.groupType === 'quantity' && !current.item) {
      return [
        ...withoutLastOne(accumulator),
        {
          ...createArticleIfNeeded(last),
          number: current.value,
        },
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = groupNumbered;
