const fs = require('fs');

const prepositions = fs
  .readFileSync(`${__dirname}/resources/prepositions.txt`)
  .toString()
  .split('\n')
  .filter(x => x);

module.exports = prepositions;
