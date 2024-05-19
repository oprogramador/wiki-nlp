const _ = require('lodash');
const fs = require('fs');
const toLowerCase = require('./toLowerCase');

const prepositions = fs
  .readFileSync(`${__dirname}/resources/prepositions.txt`)
  .toString()
  .split('\n')
  .filter(x => x);

const groupPrepositions = phrase => phrase.reduce(
  (accumulator, current) => (
    prepositions.includes(toLowerCase(current))
      ? [...accumulator, current, []]
      : [
        ...accumulator.slice(0, -1),
        [...(_.last(accumulator) || []), current],
      ]
  ),
  [],
);

module.exports = groupPrepositions;
