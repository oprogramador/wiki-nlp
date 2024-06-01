const _ = require('lodash');

const addCommas = phrase => phrase.reduce(
  (accumulator, current) => {
    const last = _.last(accumulator) || {};
    if (last !== ',' && current === 'and') {
      return [...accumulator, ',', current];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = addCommas;
