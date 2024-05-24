const fs = require('fs');
const groupVerbs = require('./groupVerbs');

const prepositions = fs
  .readFileSync(`${__dirname}/resources/prepositions.txt`)
  .toString()
  .split('\n')
  .filter(x => x);

const groupPrepositions = phrase => groupVerbs(
  phrase,
  {
    groupType: 'preposition',
    list: prepositions,
  },
);

module.exports = groupPrepositions;
