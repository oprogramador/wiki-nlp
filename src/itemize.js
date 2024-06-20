const _ = require('lodash');
const auxiliary = require('./auxiliaryList');
const prepositions = require('./prepositionList');

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
      ...accumulator.slice(0, -1),
      {
        ...last,
        item: current,
      },
    ];
  },
  []);

module.exports = itemize;
