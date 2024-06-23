const fs = require('fs');

const list = fs
  .readFileSync(`${__dirname}/resources/irregular-verbs-past.txt`)
  .toString()
  .split('\n')
  .filter(x => x);

module.exports = list;
