const _ = require('lodash');
const auxiliary = require('./auxiliaryList');
const prepositions = require('./prepositionList');
const { withoutLastOne } = require('./listUtils');
const pronouns = require('./pronounsList');
const isAdverb = require('./isAdverb');
const isUpperCase = require('./isUpperCase');
const toLowerCase = require('./toLowerCase');

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
