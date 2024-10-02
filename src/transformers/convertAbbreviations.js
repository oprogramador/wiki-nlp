const convertAbbreviations = phrase => phrase
  .reduce((accumulator, current) => {
    if (/\.[A-Z]/.test(current)) {
      return [
        ...accumulator,
        {
          groupType: 'article',
          words: [current],
        },
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = convertAbbreviations;
