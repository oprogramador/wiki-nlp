const _ = require('lodash');
const auxiliary = require('../utils/auxiliaryList');
const prepositions = require('../utils/prepositionList');
const { withoutLastOne } = require('../utils/listUtils');
const pronouns = require('../utils/pronounsList');
const isAdverb = require('../utils/isAdverb');
const isUpperCase = require('../utils/isUpperCase');
const toLowerCase = require('../utils/toLowerCase');

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
          groupType: 'numbered',
          item: last,
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
