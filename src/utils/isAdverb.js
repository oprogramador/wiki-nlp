const excluded = [
  'family',
];

const isAdverb = word => !excluded.includes(word) && /ly$/.test(word);

module.exports = isAdverb;
