const convertMid = phrase => phrase.reduce(
  (accumulator, current) => {
    if (/^mid-/.test(current)) {
      return [
        ...accumulator,
        'mid',
        current.replace(/mid-/, ''),
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertMid;
