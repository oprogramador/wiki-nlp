const excluded = [
  'ally',
  'family',
];

const isAdverb = word => !excluded.includes(word) && /ly$/.test(word);

module.exports = isAdverb;
