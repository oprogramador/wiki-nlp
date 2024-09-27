const fs = require('fs');

const auxiliary = fs
  .readFileSync(`${__dirname}/../resources/auxiliary.txt`)
  .toString()
  .split('\n')
  .filter(x => x);

module.exports = auxiliary;
