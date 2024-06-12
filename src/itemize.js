const _ = require('lodash');

const itemize = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator) || {};
    if (last.groupType !== 'quantity' || last.item) {
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
