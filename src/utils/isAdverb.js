const excluded = [
  'ally',
  'family',
  'holy',
  'monopoly',
];

const isAdverb = word => !excluded.includes(word) && /ly$/.test(word);

module.exports = isAdverb;
