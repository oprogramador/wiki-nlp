const list = [
  ',',
  ':',
];

const convertPunctuation = phrase => phrase
  .map(
    word => (list.includes(word.slice(-1))
      ? [word.slice(0, -1), word.slice(-1)]
      : [word]),
  )
  .flat();

module.exports = convertPunctuation;
