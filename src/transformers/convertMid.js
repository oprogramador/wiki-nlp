const convertMid = phrase => phrase.reduce(
  (accumulator, current) => {
    if (/^mid-[0-9]/.test(current)) {
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
