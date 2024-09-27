const fs = require('fs');

const meaninglessList = fs
  .readFileSync(`${__dirname}/../resources/meaningless.txt`)
  .toString()
  .split('\n')
  .filter(x => x);

const removeMeaningless = phrase => phrase
  .filter(
    word => !meaninglessList.includes(word.replace(/[^A-Za-z]/g, '').toLowerCase()),
  );

module.exports = removeMeaningless;
