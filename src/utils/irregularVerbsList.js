const fs = require('fs');

const list = fs
  .readFileSync(`${__dirname}/../resources/irregular-verbs.txt`)
  .toString()
  .split('\n')
  .filter(x => x);

const verbs = list
  .map(line => line.split(','))
  .map(parts => ({ past: parts[1], pastParticiple: parts[2], present: parts[0] }));

module.exports = verbs;
