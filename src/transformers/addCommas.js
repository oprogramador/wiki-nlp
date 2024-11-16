const _ = require('lodash');

const separators = require('../utils/logicalList');

const addCommas = phrase => phrase.reduce(
  (accumulator, current) => {
    const last = _.last(accumulator) || {};
    if (last !== ',' && separators.includes(current)) {
      return [...accumulator, ',', current];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = addCommas;
