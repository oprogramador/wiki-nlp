const _ = require('lodash');
const auxiliary = require('./auxiliaryList');
const prepositions = require('./prepositionList');
const { withoutLastOne, withoutLast, getBeforeLast } = require('./listUtils');

const isPlural = word => (word.groupType && !['locality'].includes(word.groupType))
  || (/s$/.test(word) && ![...auxiliary, prepositions].includes(word))
  || ['people', 'children'].includes(word);

const itemize = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator) || {};
    const beforeLast = getBeforeLast(accumulator);
    if (['share', 'unit'].includes(beforeLast.groupType) && last === 'of') {
      return [
        ...withoutLast(accumulator, 2),
        {
          ...beforeLast,
          item: current,
        },
      ];
    }
    if (last.groupType !== 'quantity' || last.item || !isPlural(current)) {
      return [
        ...accumulator,
        current,
      ];
    }

    return [
      ...withoutLastOne(accumulator),
      {
        ...last,
        item: current,
      },
    ];
  },
  []);

module.exports = itemize;
