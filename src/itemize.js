const _ = require('lodash');
const auxiliary = require('./auxiliaryList');
const prepositions = require('./prepositionList');
const { withoutLastOne } = require('./listUtils');

const isPlural = word => word.groupType
  || (/s$/.test(word) && ![...auxiliary, prepositions].includes(word))
  || ['people', 'children'].includes(word);

const itemize = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator) || {};
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
