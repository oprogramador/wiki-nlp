const convertDateRanges = phrase => phrase.reduce(
  (accumulator, current) => {
    if (/–/.test(current)) {
      const split = current.split('–');

      return [
        ...accumulator,
        {
          groupType: 'date',
          maxYear: split[1],
          minYear: split[0],
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertDateRanges;
