const convertPreBce = phrase => phrase.reduce(
  (accumulator, current) => {
    if (current === 'BCE') {
      return [
        ...accumulator,
        {
          groupType: 'BCE',
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertPreBce;
