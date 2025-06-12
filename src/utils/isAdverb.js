const excluded = [
  'ally',
  'family',
  'holy',
];

const isAdverb = word => !excluded.includes(word) && /ly$/.test(word);

module.exports = isAdverb;
